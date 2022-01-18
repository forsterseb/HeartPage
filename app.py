from flask import Flask, render_template, Response, redirect
import time
import random

app = Flask(__name__)

@app.route('/')
def base():
    return redirect("/index.html", code=302)

@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/api/pulse', methods=['GET'])
def pulse():
    def events():
        while(True):
            pulse = random.randrange(60,180)
            yield f"data: {pulse}\n\n"
            time.sleep(.2)  # an artificial delay
    return Response(events(), content_type='text/event-stream')