from django.db import models

from core.models import AbstractTimeStampModel
from users.models import User
from portfolio.models import Portfolio
from tags.models import Tag

class Mentoring(AbstractTimeStampModel):
    mentor=models.ForeignKey(User, related_name='opened_mentoring', on_delete=models.CASCADE)
    mentees=models.ManyToManyField(User, related_name='participated_mentoring')
    portfolio=models.ForeignKey(Portfolio, on_delete=models.CASCADE)
    tags=models.ManyToManyField(Tag)
    title=models.CharField(max_length=120)
    start_date=models.DateTimeField(null=False)
    end_date=models.DateTimeField(null=False)
    memo=models.TextField(null=False)
    thumbnail=models.ImageField(null=True, blank=True)
    description=models.TextField(null=False, default="")

    def __str__(self):
        return self.title

class Assignment(AbstractTimeStampModel):
    mentoring=models.ForeignKey(Mentoring, related_name='assignments', on_delete=models.CASCADE)
    passed_mentees=models.ManyToManyField(User)
    title=models.CharField(max_length=120)
    content=models.TextField(null=False)
    deadline=models.DateTimeField(null=False)

    def __str__(self):
        return self.title
