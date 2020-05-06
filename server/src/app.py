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

@app.route('/join/<id>')
def join(id):
    print(id, file=sys.stdout)
    #if id is in database, then continue, otherwise redirect to 404 error
    return render_template('signup.html',id=id)

@app.route('/workspace/<id>')
def join(id):
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
def dash():
    context = { 'server_time': format_server_time() }
    return render_template('dashboard.html', context=context)

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT', 8080)))