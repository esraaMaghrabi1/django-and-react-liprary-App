from django.db import models

# Create your models here.
class booksec(models.Model):
    type = models.CharField(max_length=50)

class Book(models.Model):
    section = models.ForeignKey(booksec,on_delete=models.CASCADE)
    img = models.CharField(max_length=200)
    bottun = models.CharField(max_length=50)
    showMenu = models.BooleanField(default=False)
    borrowed = models.BooleanField(default=False)  
    
class BorowerInformation(models.Model):
    book = models.ForeignKey(Book,on_delete=models.CASCADE)
    dateFrom = models.DateTimeField('date published')
    DateTo = models.DateTimeField('date published')
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50) 
    