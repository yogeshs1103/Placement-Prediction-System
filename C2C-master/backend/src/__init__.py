from flask import Flask, request
from flask_cors import CORS, cross_origin
import traceback
import requests
import re
import PyPDF2
import os
import threading
import logging
from src.ml.utils import deleteTempFiles
from src.ml.utils import delete_file
from src.ml.utils import check_columns_and_datatypes

from src.ml.predict import predict_college_stats, predict_student_placement


deleteTempFiles()


def compare(compare_list, compare_str):
    for i in compare_list:
        if i.lower() in compare_str.lower():
            return True
    return False


def create_app(test_config=None):

    app = Flask(__name__, static_url_path='', static_folder='static')
    CORS(app)

    @app.get('/')
    def Check():
        return {
            'status': 'Working....'
        }

    @app.post("/api/predict-campus-placements")
    @cross_origin(origins='*')
    def PredictCampusPlacements():
        try:

            campus_data_file = request.files.get('file', None)

            if campus_data_file is None:
                return {
                    'message': '[file] key not found in the form-data. Please upload excel file to fetch insights.'
                }, 400

            isError, errorMessage = check_columns_and_datatypes(
                campus_data_file)

            if isError == True:
                return {
                    'message': errorMessage
                }, 400

            stats, download_url = predict_college_stats(campus_data_file)

            temp_file_url_path = os.path.join(
                os.path.dirname(__file__), 'static', 'temp', download_url.split('/')[2])

            timer = threading.Timer(
                60*60, delete_file, args=[temp_file_url_path])
            timer.start()

            return {
                'status': 'file uploaded....',
                'stats': stats,
                'download_url': download_url
            }
        except TypeError as type_error:
            return {
                'message': str(type_error)
            }, 400
        except Exception as e:
            return {
                'message': 'Something went wrong.',
                'stack': traceback.format_exc()
            }, 500

    @app.post('/api/predict-student-placement')
    @cross_origin(origins='*')
    def PredictStudentPlacement():
        try:
            data = request.json
            predictions = predict_student_placement(data)
            return predictions, 200
        except Exception as e:
            return {
                'message': 'Something went wrong.',
                'stack': traceback.format_exc()
            }, 500

    @app.post("/api/resume-parser")
    @cross_origin(origins='*')
    def ResumeParser():
        try:
            pdf_file_obj = request.files['file']
            logging.basicConfig(filename="newfile1.log",
                    format='%(asctime)s %(message)s',
                    filemode='w')
 
            # Creating an object
            logger = logging.getLogger()
            
            # # logger.error(request.files['file'].read())
            # if(resume_file is None):
            #     return {
            #         'message': 'File not found. Make sure you uploaded the resume file'
            #     }, 400
            # resume_file_binary = resume_file.read()
            # resume_file_binary_enc = base64.b64encode(resume_file_binary)
            # # logger.error(resume_file_binary_enc)

            # url = "https://api.affinda.com/v3/documents"

            # # files = {"file": (resume_file.filename,
            #                 #   resume_file_binary, "application/pdf")}
            # payload = {
            #     # "file": (resume_file.filename,
            #     #               resume_file_binary, "application/pdf"),
            #     "wait": "true",
            #     "collection": "CJNtCKXk",
            #     "workspace": "pqbaFktK",
            #     "language": "en"
            # }
            # logger.error(payload)

            # # payload = json.dumps(payload)
            # headers = {
            #     "accept": "application/json",
            #     # "content-type": "multipart/form-data; boundary=----",
            #     "authorization": "Bearer "+os.getenv('RESUME_PARSER_API')
            # }

            # response = requests.post(
            #     url, data=payload, files=resume_file, headers=headers)
            
            
            # logger.error(response)
            details = {
                "tier": 2,
                "cgpa": None,
                "inter_gpa": None,
                "ssc_gpa": None,
                "internships": 0,
                "no_of_projects": 0,
                "is_participate_hackathon": 0,
                "is_participated_extracurricular": 0,
                "no_of_programming_languages": 0,
                "dsa": 0,
                "mobile_dev": 0,
                "web_dev": 0,
                "Machine Learning": 0,
                "cloud": 0,
                "CSE": 0,
                "ECE": 0,
                "IT": 0,
                "MECH": 0
            }

            # pdf_file_obj = open(file_path, 'rb')
            pdf_reader = PyPDF2.PdfReader(pdf_file_obj)
            text = ""
            for page_num in range(len(pdf_reader.pages)):
                page_obj = pdf_reader.pages[page_num]
                text += page_obj.extract_text()
            pdf_file_obj.close()

            logger.error(text)
            skills = [s.strip() for s in (re.split('Technical Skills:', text)[1].strip().split(','))]
            education = re.split('EDUCATION', text)[1].strip().splitlines()
            projects = len(re.split('PROJECTS', text)[1].strip().split('Key Skills')) - 1
            interships = len(re.split('.*Intern.*', text)) - 1

            education_list = []

            for i in range(0, len(education), 2):
                e = {
                    "educationLevel": education[i] if 'Bachelor' in education[i] or 'HSC' in education[i] or 'SSC' in education[
                        i] else "NA",
                    "specialization": education[i].split('(')[1].strip(')') if 'Bachelor' in education[i] else 'NA',
                    "grade": float(education[i + 1].split('•')[3].strip()) if 'Bachelor' in education[i] or 'HSC' in education[
                        i] or 'SSC' in education[i] else 0.0
                }
                education_list.append(e)

            data = {
                "name": " ",
                "skills": skills,
                "projects": projects,
                "interships": interships,
                "education": education_list,
                "rawText": text,
            }
            logger.error(data)
            try:
                if data['education'] is not None:
                    for i in data["education"]:
                        if (i["educationLevel"] is not None and 'bachelor' in i["educationLevel"].lower()):

                            details["cgpa"] = i["grade"]

                            branch = i["specialization"].lower()
                            if compare(['cse', 'computer', 'csbs', 'cst'], branch):
                                details["CSE"] = 1
                            elif compare(['communication', 'ece'], branch):
                                details['ECE'] = 1
                            elif compare(['mechanical', 'mech'], branch):
                                details["MECH"] = 1
                        if (i["educationLevel"] is not None and 'ssc' in i["educationLevel"].lower()):
                            details["ssc_gpa"] = i["grade"]
                        if (i["educationLevel"] is not None and 'hsc' in i["educationLevel"].lower()):
                            details["inter_gpa"] = i["grade"]

            except:
                pass

            try:
                if 'Hackathon' in data["rawText"]:
                    details['is_participate_hackathon'] = 1
                if compare(['member', 'contest', 'participated', 'volunteer', 'activit'], data['rawText']):
                    details['is_participated_extracurricular'] = 1
            except:
                pass

            try:
                for name in data["skills"]:
                    logger.error(name)
                    if compare(["dsa", "data structures", "algorithms"], name):
                        details['dsa'] = 1
                    if compare(['html', 'css', 'javascript', 'mern'], name):
                        details['web_dev'] = 1
                    if compare(['machine learning', 'data science'], name):
                        details["Machine Learning"] = 1
                    if compare(['cloud', 'aws', 'azure'], name):
                        details['cloud'] = 1
                    if compare(['mobile', 'flutter', 'react native', 'swift', 'kotlin'], name):
                        details['mobile_dev'] = 1
                    if compare(['java', 'c++', 'python', 'golang', 'javascript', 'c#', 'php'], name):
                        details['no_of_programming_languages'] += 1
            except:
                pass

            try:
                if data['interships'] is not None:
                    details['internships'] = data['interships']
            except:
                pass

            try:
                if data['projects'] is not None:
                    details['no_of_projects'] = data['projects']
            except:
                pass

            try:
                studentName = data['name']
            except:
                pass
            return {"details": details, "studentName": studentName}

        except Exception as e:
            print(e)
            return {
                'message': 'Something went wrong.',
                'stack': traceback.format_exc()
            }, 500

    @app.post("/api/recommendSkills")
    @cross_origin(origins='*')
    def RecommendSkills():
        body = request.get_json()
        url = "https://api.affinda.com/v3/resume_search/suggestion_skill?"
        skill = ""
        for i in body['skills']:
            if i == 'mobile_dev':
                skill = "mobile"
            elif i == 'web_dev':
                skill = "web"
            elif i == 'dsa':
                skill = "data structures"
            else:
                skill = i

            url = url + 'skills='+skill+'&'

        headers = {
            "accept": "application/json",
            "authorization": "Bearer "+os.getenv('RECOMMEND_SKILLS_API')
        }

        response = requests.get(url, headers=headers)

        return response.json()

    return app
