from django.contrib import admin

# Register your models here.
from .models import BorowerInformation, booksec, Book 




class Books(admin.ModelAdmin):
    list = ('img','bottun','showMenu','borrowed','section')

class borrowerinfo(admin.ModelAdmin):
    list = ('book','dateFrom','DateTo','name','email')

class BookSections(admin.ModelAdmin):
    list = ('type') 


admin.site.register(booksec,BookSections)
admin.site.register(Book,Books)
admin.site.register(BorowerInformation,borrowerinfo)

