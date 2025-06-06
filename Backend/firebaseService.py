import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
cred = credentials.Certificate("firbaseService.json")
firebase_admin.initialize_app(cred)


db = firestore.client()




def writeProjectToFirestore(project):
    # Convert Pydantic model to dictionary
    data = {}
    if hasattr(project, 'dict'):
        data = project.dict()
    else:
        data = dict(project)
    db.collection("projects").document().set(data)
    return {"status": "success", "message": "Project added successfully"}

def getAllProjectsFromFirestore():
    projects = db.collection("projects").get()
    return [{**project.to_dict(), 'projectId': project.id} for project in projects]

def getProjectFromFirestoreById(projectId):
    project = db.collection("projects").document(projectId).get()
    return project.to_dict()

def updateProjectFromFirestore(project, projectId):
    db.collection("projects").document(projectId).update(project.dict())
    return {"status": "success", "message": "Project updated successfully"}

def deleteProjectFromFirestore(projectId):
    db.collection("projects").document(projectId).delete()
    return {"status": "success", "message": "Project deleted successfully"}

def writeCommentToFirestore(comment_data):
    # Ensure comment_data is a dictionary
    if hasattr(comment_data, 'dict'):
        data = comment_data.dict()
    elif isinstance(comment_data, dict):
        data = comment_data
    else:
        raise ValueError("Invalid input: Expected dict or Pydantic model")

    # Add to Firestore
    doc_ref = db.collection("comments").document()
    doc_ref.set(data)
    
    return {
        "status": "success", 
        "message": "Comment added successfully",
        "commentId": doc_ref.id
    }


def getAllCommentsFromFirestore():
    comments = db.collection("comments").get()
    return [{**comment.to_dict(), 'commentId': comment.id} for comment in comments]

def deleteCommentFromFirestore(commentId):
    db.collection("comments").document(commentId).delete()
    return {"status": "success", "message": "Comment deleted successfully"}

def writeProfileToFirestore(profile):
    # Convert Pydantic model to dictionary
    data = {}
    if hasattr(profile, 'dict'):
        data = profile.dict()
    else:
        data = dict(profile)
    db.collection("profiles").document("Gowtham").set(data)
    return {"status": "success", "message": "Profile added successfully"}

def getProfileFromFirestore():
    profile = db.collection("profiles").document("Gowtham").get()
    return profile.to_dict()

def deleteProfileFromFirestore():
    db.collection("profiles").document("Gowtham").delete()
    return {"status": "success", "message": "Profile deleted successfully"}

def updateProfileFromFirestore(profile):
    db.collection("profiles").document("Gowtham").update(profile.dict())
    return {"status": "success", "message": "Profile updated successfully"}


def updateProfileFromFirestoreByField(field, value):
    db.collection("profiles").document("Gowtham").update({field: value})
    return {"status": "success", "message": "Profile updated successfully"}

