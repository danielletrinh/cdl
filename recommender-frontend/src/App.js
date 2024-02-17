import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Link, json } from "react-router-dom";
import Axios from "axios";

export default function App() {
  return (
    <div>
      <h1>Basic Example</h1>

      <p>
        This example demonstrates some of the core features of React Router
        including nested <code>&lt;Route&gt;</code>s,{" "}
        <code>&lt;Outlet&gt;</code>s, <code>&lt;Link&gt;</code>s, and using a
        "*" route (aka "splat route") to render a "not found" page when someone
        visits an unrecognized URL.
      </p>

      {/* Routes nest inside one another. Nested route paths build upon
          parent route paths, and nested route elements render inside
          parent route elements. See the note about <Outlet> below. */}
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="call-the-web" element={<CallTheWeb />} />
            <Route path="model-attributes" element={< ModelAttributes />} />

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
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/call-the-web">Call The Web</Link>
          </li>
          <li>
            <Link to="/model-attributes">MODEL ATTRIBS</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
        so you can think about this <Outlet> as a placeholder for
        the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <aside>I am a very fancy home page, don't you think? I can even do math! 2 + 2 = {2+2}</aside>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
      <aside>Here is some information about this page: I don't like sharing too much personal information, so this `About` page is empty. </aside>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <aside> Let's pretend there are charts and graphs here because why not? Its so exciting!</aside>
    </div>
  );
}

function CallTheWeb() {
  let [content, setContent] = useState("");
  useEffect(() => {
    Axios.get("https://i.imgur.com/XkCmUIC.jpeg", { responseType: 'arraybuffer' })
      .then((response) => {
        const base64String = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        setContent(base64String);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <h2>CallTheWeb</h2>
      <aside> Let's pretend we are calling the web here - plot twist - we are! </aside>
      <h1>CONTENT!</h1>
      <div> content..........
        <img src={`data:image/jpeg;base64, ${content}`} alt="Description" />
      </div>
    </div>
  );
}

function ModelAttributes() {
  let [content, setContent] = useState(null);
  useEffect(() => {
    Axios.get("//localhost:5000/model-attributes")
      .then((response) => {
        
        setContent(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <h2>ModelAttributes</h2>
      <aside> Here are the attributes from the latest trained model we know about:</aside>
      
      <div style={{'color': 'red'}}>{ content && content.error}</div>
    </div>
  );
}

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
