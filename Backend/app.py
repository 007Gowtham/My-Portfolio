from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from firebaseService import writeProfileToFirestore, getProfileFromFirestore, updateProfileFromFirestore, deleteProfileFromFirestore, writeCommentToFirestore, getAllCommentsFromFirestore, deleteCommentFromFirestore, writeProjectToFirestore, getAllProjectsFromFirestore, updateProjectFromFirestore, deleteProjectFromFirestore 
from fastapi.responses import JSONResponse
from contact import send_sms_notification


app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Experience(BaseModel):
    companyname: str
    role: str
    year: str
class DsaSkills(BaseModel):
    platform: str
    problemSolved: int

class Profile(BaseModel):
    name: str
    description: str
    aboutme: str
    image: str
    techskills: List[str]
    exp: List[Experience]
    dsaSkills: List[DsaSkills]

class Comment(BaseModel):
    username: str
    profileLink: str
    comment: str
class Project_Image(BaseModel):
    imageLink: str
    imageAlt: str
class Project(BaseModel):
    name: str
    description: str
    service: str
    tools: List[str]
    value: str
    timeline: str
    images: List[Project_Image]
    githubLink: str
    liveLink: str
    conclusion: str

class Contact(BaseModel):
    name: str
    email: str
    soi:str
    message: str
    



@app.post("/contact")
def create_contact(contact: Contact):
    if any([
        not contact.name.strip(),
        not contact.email.strip(),
        not contact.soi.strip(),
        not contact.message.strip(),
    ]):
        raise HTTPException(status_code=400, detail="All fields must be non-empty")
    response = send_sms_notification(contact)
    return JSONResponse(content=response)

@app.post("/project")
def create_project(project: Project):
    if any([
        not project.name.strip(),
        not project.description.strip(),
        not project.service.strip(),
        not project.tools,
        not project.value.strip(),
        not project.timeline.strip(),
        not project.images,
        not project.githubLink.strip(),
        not project.liveLink.strip(),
        not project.conclusion.strip(),
    ]):
        raise HTTPException(status_code=400, detail="All fields must be non-empty")
    response = writeProjectToFirestore(project)
    return JSONResponse(content=response)

@app.get("/project")
def get_project():
    response = getAllProjectsFromFirestore()
    return JSONResponse(content=response)

@app.put("/project")
def update_project(project: Project, projectId: str):
    response = updateProjectFromFirestore(project, projectId)
    return JSONResponse(content=response)

@app.delete("/project")
def delete_project(projectId: str):
    response = deleteProjectFromFirestore(projectId)
    return JSONResponse(content=response)

@app.get("/project")
def get_project(projectId: str):
    response = getProjectFromFirestoreById(projectId)
    return JSONResponse(content=response)

@app.post("/comment")
def create_comment(comment: Comment):
       
    if any([
        not comment.username.strip(),
        not comment.profileLink.strip(),
        not comment.comment.strip(),
    ]):
        raise HTTPException(status_code=400, detail="All fields must be non-empty")
    response = writeCommentToFirestore(comment)
    return JSONResponse(content=response)

@app.get("/comment")
def get_comment():
    response = getAllCommentsFromFirestore()
    return JSONResponse(content=response)

@app.delete("/comment")
def delete_comment(commentId: str):
    response = deleteCommentFromFirestore(commentId)
    return JSONResponse(content=response)

@app.post("/profile")
def create_profile(profile: Profile):

    if any([
        not profile.name.strip(),
        not profile.description.strip(),
        not profile.aboutme.strip(),
        not profile.image.strip(),
        not profile.techskills,
        not profile.exp,
        not profile.dsaSkills
    ]):
        raise HTTPException(status_code=400, detail="All fields must be non-empty")
    response = writeProfileToFirestore(profile)
    return JSONResponse(content=response)

@app.get("/profile")
def get_profile():
    response = getProfileFromFirestore()
    return JSONResponse(content=response)

@app.put("/profile")
def update_profile(profile: Profile):
    response = updateProfileFromFirestore(profile)
    return JSONResponse(content=response)

@app.delete("/profile")
def delete_profile():
    response = deleteProfileFromFirestore()
    return JSONResponse(content=response)
@app.get("/")
def read_root():
    return {"Hello": "World"}