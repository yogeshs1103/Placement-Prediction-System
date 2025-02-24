export const AbtTier3 = () => {
  const teamMembers = [
    {
      name: 'Prasad Kurale',
      photo: '/public/static/images/pd_image.jpg',
      linkedin: 'https://www.linkedin.com/in/prasad-kurale/',
      github:   'https://github.com/Prasadk2508' ,
      gmail:    'prasadkurale.jobs@gmail.com'
    },
    // Add more team members as needed
  ];

  const containerStyle = {
    width: '80%', // Adjust the width of the box as needed
    margin: '20px auto', // Center the box horizontally and add margin top and bottom
    padding: '20px', // Add padding around the content inside the box
    border: '4px solid #ccc', // Add a border around the box with increased thickness
    borderRadius: '10px', // Adjust border-radius to make it rounded
  };
  


  const photoStyle = {
    width: '180px', // Adjust the width of the photo container as needed
    height: '230px', // Adjust the height of the photo container as needed
    margin: '0 auto', // Center the photo horizontally
    overflow: 'hidden',
    borderRadius: '20px', // Adjust border-radius to make it rectangular
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const nameStyle = {
    fontSize: '28px', // Adjust font size as needed
    marginTop: '20px',
    textAlign: 'center' // Add space between the photo and the name
    
  };

  const logoContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px', // Add space between the name and logos
  };

  // const logoStyle = {
  //   width: '30px', // Adjust the width of the logos
  //   height: '30px',
  //   marginRight: '20px' // Increase the space between logos
  // };

  return (
    <div style={containerStyle}>
      <div>
        {teamMembers.map((member, index) => (
          <div key={index}>
            <div style={photoStyle}>
              <img src={member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h1 style={nameStyle}>{member.name}</h1>

            <div style={logoContainerStyle}>
                <a href={member.linkedin} style={{ textDecoration: 'none', color: '#000', marginRight: '24px'}}>
                    <img src="/public/static/images/l_logo.png" alt="LinkedIn Logo" style={{ width: '25px', height: '25px', verticalAlign: 'middle' }} />
                </a>
                <a href={member.github} style={{ textDecoration: 'none', color: '#000', marginRight: '24px' }}>
                    <img src="/public/static/images/github-mark.png" alt="GitHub Logo" style={{ width: '28px', height: '28px', verticalAlign: 'middle' }} />
                </a>
                <a href={`mailto:${member.gmail}`} style={{ textDecoration: 'none', color: '#000' }}>
                    <img src="/public/static/images/gmail_logo.png" alt="Gmail Logo" style={{ width: '28px', height: '28px', verticalAlign: 'middle' }} />
                </a>
            </div>


          </div>
        ))}
      </div>
      {/* The Chart component remains unchanged */}
      {/* <Chart options={chart_data.options} series={chart_data.series} type="scatter" width="100%" /> */}
    </div>
  );
};
