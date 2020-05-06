
from flask import Flask, render_template, make_response
import os
import time

app = Flask(__name__)

def format_server_time():
  server_time = time.localtime()
  return time.strftime("%I:%M:%S %p", server_time)

@app.route('/')
def index():
    context = { 'server_time': format_server_time() }
    return render_template('index.html', context=context)

@app.route('/dashboard')
<<<<<<< HEAD
def index():
=======
def dash():
>>>>>>> 0d1a9e0ea8709b63a2e1f8aedb1f6bc53f0fe1f4
    context = { 'server_time': format_server_time() }
    return render_template('dashboard.html', context=context)

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT', 8080)))