from notesapi.models import Note,History
from django.http import HttpResponse
from django.core import serializers
import json

def getList(request):
	if request.method == 'POST':
		data = json.loads(request.body)
		note = Note(title = data['title'])
		note.save()
		history = History(title = data['title'],description=data['description'],note = note)
		history.save()
	notes = History.objects.all()
	data = serializers.serialize('json', notes)
	return HttpResponse(data, content_type='application/json')
