# CustomWorldcup_server
## 월드컵 어쩌고
</div>      
### 커스텀 월드컵을 만들어 서로 공유하세요! 

> **월드컵 어쩌고** 의 핵심 기능은 다음과 같습니다.   
> #### 월드컵 게시, 월드컵 플레이, 월드컵 게시물 댓글, 좋아요
> 

> 항해99 14기 주특기 프로젝트 </b>
>
> 프로젝트 기간: 2023.05.05 ~ 2023.05.11


### 💡 API 명세서
[API 명세서 노션]([https://siwonmadang.notion.site/S-A-8270cdaad4ce42289642bbe0a39824c7](https://www.notion.so/siwonmadang/c822738780334e93a81b95518c98f69d?v=bcc44cebf6da4eca87e16f97b1e70ba7&pvs=4))

### 🛠 Development Environment
<img src="https://img.shields.io/badge/Node.js-v16-green"/> <img src="https://img.shields.io/badge/Sequelize-v6.31.1-blue"/> <img src="https://img.shields.io/badge/Express-v4.17.1-green"/> 

### 📋 ER Diagram
![https://github.com/siwon-school/CustomWorldcup_Back/issues/71](https://user-images.githubusercontent.com/76824986/237574679-3caad4c4-de61-4970-b1cc-703bb00810fb.png)


### ⚙️ Dependencies Module
```
"dependencies": {
    "@sentry/node": "^7.51.2",
    "bcryptjs": "^2.4.3",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "joi": "^17.9.2",
    "jsonwebtoken": "^9.0.0",
    "morgan": "^1.10.0",
    "mysql2": "^3.2.4",
    "nodemailer": "^6.9.1",
    "sequelize": "^6.31.1",
    "swagger-autogen": "^2.23.1",
    "swagger-ui-express": "^4.6.3"
  },
  "devDependencies": {
    "artillery": "^2.0.0-31",
    "jest": "^29.5.0",
    "jest-html-reporters": "^3.1.4",
    "nodemon": "^2.0.22",
    "sequelize-cli": "^6.6.0",
    "supertest": "^6.3.3"
  }
  ```
### 📌 Commit Convention

**태그: 제목의 형태**

| 태그 이름| 설명 |
| :--: | :-----: |
| feat | 새로운 기능을 추가할 경우 |
| fix | 버그를 고친 경우 |
| style | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우 |
| comment | 필요한 주석 추가 및 변경 |
| docs | 문서를 수정한 경우 (ex. README 수정) |
| rename | 파일 혹은 폴더명을 수정하거나 옮기는 작업인 경우 |
| remove | 파일을 삭제하는 작업만 수행한 경우 |
| chore | 빌드 태스크 업데이트, swagger, 패키지 매니저를 설정하는 경우 |

### 📌 Coding Convention
<details>
<summary>변수명</summary>   
<div markdown="1">       
      
 
 1. Camel Case 사용 
   - lower Camel Case
 2. 함수의 경우 동사+명사 사용 
   - ex) getInformation()
 
</div>
</details>

<details>
<summary>비동기 함수의 사용</summary>
<div markdown="1">       

 1. async, await 함수 사용을 지향한다.
 2. Promise 사용은 지양한다.
 
</div>
</details>

<details>
<summary>DataBase</summary>
<div markdown="1">       

 1. Model 파일명은 대문자
 2. 필드명은 CamelCase 사용
 
</div>
</details>

### 🙋🏻‍♀️ 담당
<details>
<summary>api 구현</summary>
<div markdown="1">  

| 기능명 | 담당자 | 완료 여부 |
| :-----: | :---: | :---: |
| 로그인, 회원가입 | `주지민` | 완료 |
| 여행 생성 | `채정아` | 완료 |
| 여행 그룹 멤버 추가 | `채정아` | 완료 |
| 그룹 성향 테스트 결과 조회 | `채정아` | 완료 |
| 성향 테스트 질문 조회 | `채정아` | 완료 |
| 여행 일정 삭제 | `채정아` | 완료 |
| 여행 별 이미지 조회 | `채정아` | 완료 |
| 여행 정보 조회 | `채정아` | 완료 |
| 성향 테스트 결과 저장 | `채정아` | 완료 |
| 성향 테스트 카운팅 조회 | `채정아` | 완료 |
| ec2 배포, s3 관리 | `채정아` | 완료 |
| 일자 별 여행 일정 조회 | `정설희` | 완료 |
| 특정 여행 일정 조회 | `정설희` | 완료 |
| 일자 별 여행 일정 조회 | `정설희` | 완료 |
| 여행 일정 추가 | `정설희` | 완료 |
| 여행 일정 수정 | `정설희` | 완료 |
| 여행 보드 추가 | `정설희` | 완료 |
| 여행 이미지 전체 조회 | `변주현` | 완료 |
| 참여코드로 여행 참여, 정보 조회 | `변주현` | 완료 |
| 마이페이지 조회 | `변주현` | 완료 |
| 여행 수정 | `변주현` | 완료 |
| 여행 보드 조회 | `변주현` | 완료 |
| 여행 보드 수정 | `변주현` | 완료 |
| 여행 보드 삭제 | `변주현` | 완료 |
| 사용자 기간 별 여행 조회 | `변주현` | 완료 |

</div>
</details>

### 👩🏻‍💻 Developers   
| 채정아 | 정설희 | 변주현 |
| :---: | :---: | :---: |
|<img src="https://user-images.githubusercontent.com/20807197/122161395-9ab23880-ceac-11eb-9498-bed403daa960.png" width="150px" height="150px" />|<img src ="https://user-images.githubusercontent.com/20807197/124384875-457c8080-dd0e-11eb-8308-137003b9c77a.png" width = "150px" height="150px" />|<img src ="https://user-images.githubusercontent.com/20807197/124384900-66dd6c80-dd0e-11eb-82bd-662ad808e6df.png" width = "150px" height="150px" />|
|[jokj624](https://github.com/jokj624)|[xxeol2](https://github.com/xxeol2)|[wngus4296](https://github.com/wngus4296)| 
