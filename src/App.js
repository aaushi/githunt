//import logo from './logo.svg';
//import milkywayBackground from './assets/milky-way-2695569_1280.jpg'
//import './App.css';
//import githubpng from '../assets/githubpng.png'
import { useState } from 'react';
import { useEffect } from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import { getUsersApi } from './services/getUsers';

function App() {
  const [userName,setUserName]=useState('');
  const [userDetails, setUserDetails] = useState();
  
  
  useEffect(() => {
    getUser();
  }, [userName]);

  const getUser=async()=>{
    console.log(userName)
    //const data = await fetch("https://api.github.com/users/"+userName);
    //const res=await data.json();
    const res = await getUsersApi(userName);
    console.log(res)
    setUserDetails(res);
    console.log(userDetails);

  }
  return (
    <>
      <div className=" bg-[url('./assets/bgsea.jpg')] bg-cover h-screen w-screen bg-no-repeat   flex flex-col items-center ">
        {/*  <img
          src={githubpng}
          className="h-32 w-40  self-center  "
          alt="githubpng"
        /> */}

        <div className="w-1/2 h-3/4 flex flex-col">
          <TextField
            className="justify-center"
            label="Username"
            variant="filled"
            value={userName}
            
            inputProps={{ "data-testid": "userNameInput" }}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Card className="w-full h-full" data-testid="userCard">
            <CardMedia sx={{ height: 400 }} image={userDetails?.avatar_url} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {userDetails?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userDetails?.login}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">
                <a href={userDetails?.html_url} target="_blank">
                  Learn More
                </a>
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </>
  );
}

export default App;
