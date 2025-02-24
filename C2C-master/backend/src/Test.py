

filepath="C:\\Users\\p2508\\OneDrive\\Desktop\\Prasad's_Resume[1].pdf"



import PyPDF2
def extract_text_from_pdf(file_path):
    pdf_file_obj = open(file_path, 'rb')
    pdf_reader = PyPDF2.PdfReader(pdf_file_obj)
    text = ""
    for page_num in range(len(pdf_reader.pages)):
        page_obj = pdf_reader.pages[page_num]
        text += page_obj.extract_text()
    pdf_file_obj.close()
    return text
print(extract_text_from_pdf(filepath))
