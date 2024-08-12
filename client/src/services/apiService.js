import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const postSignupData = async (Username, Usermail, DateofBirth, Password, Profilepic, navigate) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Username, Usermail, DateofBirth, Password, Profilepic }),
    });

    if (response.ok) {
      const message = await response.text();
      if (message === 'User Created Successfully') {
        const confirmed = window.confirm('Account Created Successfully. Click OK to continue.');
        if (confirmed) {
          navigate('/login');
        }
      } else {
        toast.error(message)
      }
    } else {
      const errorMessage = await response.text();
      if (errorMessage === 'User Already Exists') {
        toast.error('User Already Exists');
      } else {
        toast.error('Some problem occurred. Please try again later.');
      }
    }
  } catch (error) {
    toast.error('Error occurred while processing your request. Please try again later.');
  }
};

// Named export for postloginData
export const postloginData = async (Usermail, Password, navigate, login) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/finduser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Usermail, Password }),
    });

    if (response.ok) {
      const user = await response.json();
     login(user); // Call the login function from context with the user data
      toast.success('Login Successful');
      navigate('/Home'); // Redirect to the dashboard or another page
    } else {
      const errorMessage = await response.text();
      if (errorMessage === 'User not exists') {
        toast.error('User does not exist.');
      } else if (errorMessage === 'Incorrect password') {
        toast.error('Incorrect password.');
      } else {
        toast.error('Some problem occurred. Please try again later.');
      }
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error('Error occurred while processing your request. Please try again later.');
  }
};
export const getallvideos = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/allvideos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        const videosData = await response.json();
        return videosData;
    } else {
        toast.error('Failed to fetch data:', response.statusText);
    }
} catch (error) {
    toast.error(error);
}
};
export const getallSeries = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/allseries`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        const videosData = await response.json();
        return videosData;
    } else {
        toast.error(response.statusText);
    }
} catch (error) {
   toast.error(error);
}
};
export const getallMovies = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/allmovies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        const videosData = await response.json();
        return videosData;
    } else {
        toast.error(response.statusText);
    }
} catch (error) {
   toast.error(error);
}
};
export const getmyground = async (UploadBy) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/mygroundvideos?UploadBy=${UploadBy}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const videosData = await response.json();
      return videosData;
    } else {
      toast.error(response.statusText);
    }
  } catch (error) {
   toast.error(error);
  }
};
export const getallusers = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/allusers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        const usersData = await response.json();
        return usersData;
    } else {
        toast.error(response.statusText);
    }
} catch (error) {
   toast.error(error);
}
};
export const getvdoreq = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/allvdoreq`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        const vdoreqData = await response.json();
        return vdoreqData;
    } else {
        toast.error(response.statusText);
    }
} catch (error) {
   toast.error(error);
}
};
export const deluser= async(Usermail)=>{
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/removeuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Usermail }),
    });

    if (response.ok) {
      const message = await response.text();
      if (message === 'User deleted successfully') {
          toast.success('User removed successfully')
        }
      }
 else {
      const errorMessage = await response.text();
      if (errorMessage === 'Internal server error') {
        toast.error('Internal server error');
      } else {
        console.error('Error:', errorMessage);
        toast.error('Some problem occurred. Please try again later.');
      }
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error('Error occurred while processing your request. Please try again later.');
  }
} 
export const delvideoreq = async(title)=>{
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/delvdoreq`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title}),
    });

    if (response.ok) {
      const message = await response.text();
      if (message === 'Video deleted Successfully') {
          toast.success('Video Request deleted')
        }
        else if (message==='Video not found'){
          toast.error('Video not found')
        }
      } 
 else {
      const errorMessage = await response.text();
      if (errorMessage === 'Internal server error') {
        toast.error('Internal server error');
      } else {
        toast.error('Some problem occurred. Please try again later.');
      }
    }
  } catch (error) {
    toast.error('Error occurred while processing your request. Please try again later.');
  }
} 
export const delvideo = async(VideoID)=>{
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/removevideo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ VideoID}),
    });

    if (response.ok) {
      const message = await response.text();
      if (message === 'Video deleted Successfully') {
          toast.success('Video deleted Successfully')
        }
      }
 else {
      const errorMessage = await response.text();
      if (errorMessage === 'Internal server error') {
        toast.error('Internal server error');
      } else {
        console.error('Error:', errorMessage);
        toast.error('Some problem occurred. Please try again later.');
      }
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error('Error occurred while processing your request. Please try again later.');
  }
} 
export const getdashcount = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getcount`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        const count = await response.json();
        return count;
    } else {
        toast.error(response.statusText);
    }
} catch (error) {
   toast.error(error);
}
};

export const postvidreqData = async (title, videoUrl, thumbnailUrl, genre, duration, isSeries, UploadBy) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/addvdoreq`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, videoUrl, thumbnailUrl, genre, duration, isSeries, UploadBy }),
    });
   
    if (response.ok) {
      const message = await response.text();
      if (message === 'Request Added Successfully') {
        toast.success("Request Added Successfully")
      } else {
        toast.error(message)
      }
    } else {
      const errorMessage = await response.text();
      if (errorMessage === 'Internal server error') {
        toast.error('Internal server error');
      } else {
        console.error('Error:', errorMessage);
        toast.error('Some problem occurred. Please try again later.');
      }
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error('Error occurred while processing your request. Please try again later.');
  }
};

export const postvidData = async (title, videoUrl, thumbnailUrl, genre, duration, isSeries, UploadBy) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/createvideo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, videoUrl, thumbnailUrl, genre, duration, isSeries, UploadBy }),
    });
   
    if (response.ok) {
      const message = await response.text();
      if (message === 'Video Added Successfully') {
        toast.success("Video Added Successfully")
      } else {
        toast.error(message)
      }
    } else {
      const errorMessage = await response.text();
      if (errorMessage === 'Internal server error') {
        toast.error('Internal server error');
      } else {
        console.error('Error:', errorMessage);
        toast.error('Some problem occurred. Please try again later.');
      }
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error('Error occurred while processing your request. Please try again later.');
  }
};
