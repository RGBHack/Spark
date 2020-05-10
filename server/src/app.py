from flask import Flask, render_template, make_response
import os
import time
import sys
from werkzeug.routing import BaseConverter

app = Flask(__name__)

class RegexConverter(BaseConverter):
    def __init__(self, url_map, *items):
        super(RegexConverter, self).__init__(url_map)
        self.regex = items[0]
app.url_map.converters['regex'] = RegexConverter

@app.route('/workspace/<id>')
def workspace(id):
    print(id, file=sys.stdout)
    #if id is in database, then continue, otherwise redirect to 404 error
    return render_template('signup.html',id=id)

def format_server_time():
  server_time = time.localtime()
  return time.strftime("%I:%M:%S %p", server_time)

@app.route('/')
def index():
    context = { 'server_time': format_server_time() }
    return render_template('index.html', context=context)

@app.route('/dashboard')
def dashboard():
    context = { 'server_time': format_server_time() }
    return render_template('dashboard.html', context=context)

@app.route('/calendar')
def calendar():
    context = { 'server_time': format_server_time() }
    return render_template('calendar.html', context=context)
    
@app.route('/tasks')
def tasks():
    context = { 'server_time': format_server_time() }
    return render_template('tasks.html', context=context)

@app.route('/login')
def login():
    context = { 'server_time': format_server_time() }
    return render_template('login.html', context=context)

@app.route('/about')
def about():
    context = { 'server_time': format_server_time() }
    return render_template('about.html', context=context)

@app.route('/join')
def join():
    context = { 'server_time': format_server_time() }
    return render_template('join.html', context=context)

@app.route('/join/<name>:<password>')
def joinlink(name, password):
    context = { 'server_time': format_server_time() }
    return render_template('join.html', context=context, name=name, password=password, extra=".")

@app.route('/create')
def create():
    context = { 'server_time': format_server_time() }
    return render_template('create.html', context=context)

@app.route('/chat')
def chat():
    context = { 'server_time': format_server_time() }
    return render_template('chat.html', context=context)

@app.route('/projects')
def projects():
    context = { 'server_time': format_server_time() }
    return render_template('projects.html', context=context)

@app.route('/signup')
def signup():
    context = { 'server_time': format_server_time() }
    return render_template('signup.html', context=context)

@app.route('/meetings')
def meetings():
    context = { 'server_time': format_server_time() }
    return render_template('meetings.html', context=context)

@app.route('/meetings/<meetingid>')
def meetingid(meetingid):
    context = { 'server_time': format_server_time() }
    return render_template('meetings.html', context=context, meetingid=meetingid)

if __name__ == '__main__':
    app.run(debug=True,host='127.0.0.1',port=int(os.environ.get('PORT', 5004)))