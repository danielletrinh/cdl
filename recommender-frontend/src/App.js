import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Link, json } from "react-router-dom";
import Axios from "axios";

export default function App() {
  return (
    <div>
      {/* Routes nest inside one another. Nested route paths build upon
          parent route paths, and nested route elements render inside
          parent route elements. See the note about <Outlet> below. */}
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Search />} />
            <Route path="results" element={<Results />} />
            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
        share across all the pages on your site, like navigation. */}
      

      {/* An <Outlet> renders whatever child route is currently active,
        so you can think about this <Outlet> as a placeholder for
        the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function Search() {
  const [inputText, setInputText] = useState('');

  // Event handler for input changes
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div>
      <h1>Welcome to [APP NAME]</h1>
      <p>Simply enter an author name or book title you enjoy and we'll do our best to recommend you some books!</p>
      <input
        type="text"
        placeholder="Search by author or title"
        value={inputText}
        onChange={handleInputChange}
      />

      {/* Display the entered text */}
      <a href="/Results"><button onClick={() => {}}>Recommend me some books!</button></a>
    </div>
  );
}

function Results(){
  return (
    <div>
      <h1>Results</h1>
      <p>Here are your results:</p>
      <table>
    <thead>
      <tr>
        <th>ISBN</th>
        <th>Title</th>
        <th>Author</th>
        <th>Publish Date</th>
        <th>Number of Reviews</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>978-0-306-40615-7</td>
        <td>The Hitchhiker's Guide to the Galaxy</td>
        <td>Douglas Adams</td>
        <td>1979-10-12</td>
        <td>1200</td>
      </tr>
      <tr>
        <td>978-0-439-02349-0</td>
        <td>Harry Potter and the Sorcerer's Stone</td>
        <td>J.K. Rowling</td>
        <td>1997-06-26</td>
        <td>2500</td>
      </tr>
      <tr>
        <td>978-0-061-19601-1</td>
        <td>To Kill a Mockingbird</td>
        <td>Harper Lee</td>
        <td>1960-07-11</td>
        <td>1800</td>
      </tr>
      <tr>
        <td>978-0-553-21311-0</td>
        <td>1984</td>
        <td>George Orwell</td>
        <td>1949-06-08</td>
        <td>1500</td>
      </tr>
      <tr>
        <td>978-1-590-30771-5</td>
        <td>The Da Vinci Code</td>
        <td>Dan Brown</td>
        <td>2003-03-18</td>
        <td>3200</td>
      </tr>
    </tbody>
  </table>
  <p><a href='/'><button>Return to search...</button></a></p>
    </div>
  );

}


// function CallTheWeb() {
//   let [content, setContent] = useState("");
//   useEffect(() => {
//     Axios.get("https://i.imgur.com/XkCmUIC.jpeg", { responseType: 'arraybuffer' })
//       .then((response) => {
//         const base64String = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
//         setContent(base64String);
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);
//   return (
//     <div>
//       <h2>CallTheWeb</h2>
//       <aside> Let's pretend we are calling the web here - plot twist - we are! </aside>
//       <h1>CONTENT!</h1>
//       <div> content..........
//         <img src={`data:image/jpeg;base64, ${content}`} alt="Description" />
//       </div>
//     </div>
//   );
// }

// function ModelAttributes() {
//   let [content, setContent] = useState(null);
//   useEffect(() => {
//     Axios.get("//localhost:5000/model-attributes")
//       .then((response) => {
        
//         setContent(response.data);
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);
//   return (
//     <div>
//       <h2>ModelAttributes</h2>
//       <aside> Here are the attributes from the latest trained model we know about:</aside>
      
//       <div style={{'color': 'red'}}>{ content && content.error}</div>
//     </div>
//   );
// }

function NoMatch() {
  return (
    <div>
      <h2>We lose.</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
