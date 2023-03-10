import axios from 'axios';
import { useRef } from 'react';

export default function Home() {
  const imgRef = useRef();
  return (
    <main style={{display:'flex', flexDirection:'column', padding:'50px'}}>
      <section>
        파일 업로드 테스트
        <div style={{marginTop:'15px'}}>
          <input type="file" ref={imgRef} accept="image/*" /><br/>
          <button style={{marginTop:'20px'}} onClick={onClickUpload}>업로드</button>
        </div>
      </section>
      <section style={{marginTop:'80px'}}>
        DB Insert 테스트
        <div style={{marginTop:'15px'}}>
          <button onClick={onClickRequest}>요청보내기</button>
        </div>
      </section>
    </main>
  );

  async function onClickUpload() {
    const img = imgRef.current?.files[0];

    if ( img ) {
      const formData = new FormData();
      formData.append('img', img);
      formData.append('hello', 'world');
      
      // const res = await axios.post('http://localhost:8080/api/upload',
      // const res = await axios.post('/api/upload',
      // formData, { 'Content-Type': 'multipart/form-data; charset=UTF-8;'
      // }).then(res => {
      //   console.log( res );
      // }).catch(err => {
      //   console.log( err );
      // });
      const res = await axios.post('/api/upload')
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }
  }

  async function onClickRequest() {
    const res = await axios.post('/api/db');
    console.log( res );
  }

}
