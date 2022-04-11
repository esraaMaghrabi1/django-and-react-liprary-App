from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import permissions
from liprary.serializers import BorowerInfoSerializer,BookSectionSerializer,BookSerializer
from liprary.models import BorowerInformation, booksec, Book
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response


class BookSectionViewSet(APIView):
    permission_classes = []
    def get(self, request):
        booksection= booksec.objects.all()
        serb = BookSectionSerializer(booksection,many=True)
        return Response(serb.data)

class BookViewSet(APIView):
    permission_classes = []
    def get(self, request):
        book= Book.objects.all()
        ser = BookSerializer(book,many=True)
        return Response(ser.data)
    
    def put(self, request): 
        book_id = request.data.get('id')
        print(book_id)
        book = Book.objects.get(id=book_id)
        book.bottun = 'Borrowed'
        book.borrowed = True
        book.save()
        return Response(200)


class BorrowerInfoViewSet(APIView):
    permission_classes = []
    def get(self, request):
         borrwed_books= BorowerInformation.objects.all()
         serbb= BorowerInfoSerializer(borrwed_books,many=True)
         return Response(serbb.data)
    
    def put(self, request):
        data = request.data 
        #book_id = request.data.get('book')
        serput = BorowerInfoSerializer(data=data)
        serput.is_valid(raise_exception=True)
        serput.save()
        return Response(200)
        
