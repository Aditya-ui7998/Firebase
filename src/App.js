
import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import {db,auth,storage} from './config/firebase';
import {getDocs,collection,addDoc,deleteDoc,doc,updateDoc} from 'firebase/firestore';  //IF YOU WANT A BUNCH OF DOCS THEN U USE GETDOCS IF ONE THEN USE GETDOC.
import { ref,uploadBytes } from 'firebase/storage';

function App() {
 const[movieList,setMovieList] = useState([]);

 const movieCollectionRef = collection(db,'movie');

 const getMovieList = async () => {
  try {
    const data = await getDocs(movieCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setMovieList(filteredData); // Set the movie list state here
  } catch (err) {
    console.log(err);
  }
};


 useEffect(() => {
  getMovieList();
}, []);

// NEW MOVIES................
const [movieTitle,setMovieTitle] = useState('');
const [movieDate,setMovieDate] = useState(0);
const [isAmazing,setIsAmazing] = useState(false);

const onSubmitMovie = async () => {
  try {
    await addDoc(movieCollectionRef, {//first it receives the reference(movieCollection) and in sec data in same format. 
      Title: movieTitle,
      ReleaseDate: movieDate,
      AmazingMovie: isAmazing,
      userId: auth?.currentUser?.uid,
    });
 
    getMovieList();

  } catch (err) {
    console.error(err);
  }
};

// Delete func -deleteDoc,Doc
const deleteMovie  = async (id)=>{
const movieDoc = doc(db,'movie',id);
await deleteDoc(movieDoc );
getMovieList();
}

// UPDATE TITLE
const[updatedTitle,setUpdatedTitle] = useState('');

const updateTitle = async(id)=>{
  const movieDoc = doc(db,'movie',id);
  await updateDoc(movieDoc,{Title:updatedTitle})  //so we have to pass the ref to database and then new title.
}

// FILE UPLOAD STATE
const [fileUpdate,setFileUpdate] = useState(null);
const uploadFile = async ()=>{
  if(!uploadFile) return;
  const fileUploadRef = ref(storage,`Intro-project-files/${fileUpdate.name}`);
  try{
await uploadBytes(fileUploadRef,fileUpdate) //file ka ref or jo file upload krna hai woo pass kiya.
  }catch(err){
    console.error(err);
  }
}

  return (
    <div className="App">
     <Auth/>
     <div>
      <input placeholder='Movie title...' onChange={(e)=>{setMovieTitle(e.target.value)}} />
      <input placeholder='Release date...' type="number" onChange={(e)=>{setMovieDate(Number(e.target.value))}} />
      <input type="checkbox" checked={isAmazing}  onChange={(e)=>{setIsAmazing(e.target.checked)}}/>
      <label> Amazing or what? </label>
      <button onClick={ onSubmitMovie}>Submit</button>
     </div>
     <div>
     {movieList.map((movi) => (
  <div key={movi.id}>     
    <h1 style={{color:movi.AmazingMovie ? 'green' : 'red'}}>{movi.Title}</h1>
    <p>Date: {movi.ReleaseDate}</p>
    <button onClick={()=>{deleteMovie(movi.id)}}>Delete</button>

    <input placeholder='update title...' onChange={(e)=>{setUpdatedTitle(e.target.value)}}/>
    <button onClick={()=>{updateTitle(movi.id)}}>Update Title</button>
  </div>
))}

     </div>

<div>
  <input type="file"  onChange={(e)=>{setFileUpdate(e.target.files[0])}}/>
  <button onClick={uploadFile}>Upload File</button>
</div>

    </div>
  );
}

export default App;
