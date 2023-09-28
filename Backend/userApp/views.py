
from datetime import datetime
import re
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from rest_framework.response import Response
from .models import Users
from .serializers import usersSerializer
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated


def customErrorMessage(error_data):
    error_messages = error_data.get("error",{})
    error_message = None
    for field, messages in error_messages.items():
        if messages:
            error_message = messages[0]
        return error_message
        break



def listOfUsers():
    user = Users.objects.all()
    serializer = usersSerializer(user, many=True)
    return Response({"message":"list of all users", "data":serializer.data, "status":status.HTTP_200_OK})


def signUp(req):
    serializer = usersSerializer(data=req.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message":"User Successfully added to the database", "success":"true", "status":status.HTTP_200_OK, "data":serializer.data})
    print(serializer.errors)
    return Response({"message": customErrorMessage({"error":serializer.errors}), "success":"false", "status":status.HTTP_400_BAD_REQUEST})

def signIn(req):
    user = req.data
    try:
        usr = get_object_or_404(Users, username=user['uname'])
    except:
        return Response({"message":"Username does not exist", "success":"false", "status":status.HTTP_400_BAD_REQUEST})
    found_user = authenticate(username=user['uname'], password=user['passw'])
    if not found_user:
        return Response({"message":"The password is incorect", "success":"false", "status":status.HTTP_400_BAD_REQUEST})
    token, created = Token.objects.get_or_create(user=usr)
    token.created = datetime.now()
    token.save()
    serializer = usersSerializer(instance=usr)
    return Response({"message":"Successfully loged into your account", "success":"true" , "token":token.key, "status":status.HTTP_200_OK})


def modifyUser(req, obj):
    serializer = usersSerializer(obj, data=req.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"message":"Successfully appdated your account infor", "success":"true"})
    return Response({"message":customErrorMessage({"error":serializer.errors}), "success":"false"})

def removeAccount(obj):
    obj.delete()
    return Response({"message":"Account deleted", "success":"true"})


@api_view(['GET', 'POST'])
def users_view(req):
    if req.method == 'GET':
        return listOfUsers()

    elif req.method == 'POST':
        return signUp(req)

    return Response({"message": "method not allowed", "status": status.HTTP_400_BAD_REQUEST})

@api_view(['POST'])
def signin_view(req):
    if req.method == "POST":
        return signIn(req)


@api_view(["GET","PATCH","PUT","DELETE"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def user_view(req):
    user_data = usersSerializer(instance=req.user)
    user_obj = Users.objects.get(_id = req.user._id)
    if req.method == "GET":
        #serializer = usersSerializer(instance=req.user)
        return Response({"message": f"{req.user}'s data Successfully fetched", "success":"true", "user":user_data.data, "status":status.HTTP_200_OK})
    
    elif req.method == 'PATCH':
        return modifyUser(req,user_obj)
    
    elif req.method == 'DELETE':
        return removeAccount(user_obj)




@api_view(["GET","POST"])
def test(req):
    return listOfUsers()
