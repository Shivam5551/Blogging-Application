import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signin } from './components/Signin'
import { Signup } from './components/Signup'
import { Blog } from './components/Blog'
import { RenderBlog } from './components/RenderBlog'
import { UploadBlog } from './components/UploadBlog'
import { MyBlogs } from './components/MyBlogs'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Blog/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/blog/:id' element={<RenderBlog/>}/>
        <Route path='/blog/upload' element={<UploadBlog/>}/>
        <Route path='/blog/myblogs' element={<MyBlogs/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
