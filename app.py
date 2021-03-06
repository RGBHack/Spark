from flask import (
    Flask,
    render_template,
    make_response,
    send_from_directory,
)
import os
import time
import sys
from werkzeug.routing import (
    BaseConverter,
)

app = Flask(__name__)


class RegexConverter(BaseConverter):
    def __init__(self, url_map, *items):
        super(
            RegexConverter, self
        ).__init__(url_map)
        self.regex = items[0]


app.url_map.converters[
    "regex"
] = RegexConverter


@app.route("/workspace/<id>")
def workspace(id):
    print(id, file=sys.stdout)
    # if id is in database, then continue, otherwise redirect to 404 error
    return render_template(
        "signup.html", id=id
    )


def format_server_time():
    server_time = time.localtime()
    return time.strftime(
        "%I:%M:%S %p", server_time
    )


@app.route("/")
def index():
    context = {
        "server_time": format_server_time()
    }
    return render_template(
        "index.html", context=context
    )


@app.route("/dashboard")
def dashboard():
    context = {
        "server_time": format_server_time()
    }
    return render_template(
        "dashboard.html",
        context=context,
    )


@app.route("/dashboard/<sparkroom>")
def sparkroom(sparkroom):
    context = {
        "server_time": format_server_time()
    }
    return render_template(
        "dashboard.html",
        context=context,
        sparkroom=sparkroom,
        extra=".",
    )


@app.route("/calendar")
def calendar():
    context = {
        "server_time": format_server_time()
    }
    return render_template(
        "calendar.html", context=context
    )


@app.route("/tasks")
def tasks():
    context = {
        "server_time": format_server_time()
    }
    return render_template(
        "tasks.html", context=context
    )


@app.route("/login")
def login():
    context = {
        "server_time": format_server_time()
    }
    return render_template(
        "login.html", context=context
    )


@app.route("/login/<join>")
def loginjoin(join):
    context = {
        "server_time": format_server_time()
    }
    return render_template(
        "login.html",
        context=context,
        join=join,
        extra=".",
    )


@app.route("/about")
def about():
    context = {
        "server_time": format_server_time()
    }
    return render_template(
        "about.html", context=context
    )


@app.route("/join")
def join():
    context = {
        "server_time": format_server_time()
    }
    return render_template(
        "join.html", context=context
    )


@app.route("/join/<name>:<password>")
def joinlink(name, password):
    context = {
        "server_time": format_server_time()
    }
    return render_template(
        "join.html",
        context=context,
        name=name,
        password=password,
        extra=".",
    )


@app.route("/create")
def create():
    context = {
        "server_time": format_server_time()
    }
    return render_template(
        "create.html", context=context
    )


@app.route("/chat/<sparkroom>")
def chat(sparkroom):
    context = {
        "server_time": format_server_time()
    }
    return render_template(
        "chat.html",
        context=context,
        sparkroom=sparkroom,
    )


@app.route("/projects/<sparkroom>")
def projects(sparkroom):
    context = {
        "server_time": format_server_time()
    }
    return render_template(
        "projects.html",
        context=context,
        sparkroom=sparkroom,
    )


@app.route("/signup")
def signup():
    context = {
        "server_time": format_server_time()
    }
    return render_template(
        "signup.html", context=context
    )


@app.route("/signup/<join>")
def signupjoin(join):
    context = {
        "server_time": format_server_time()
    }
    return render_template(
        "signup.html",
        context=context,
        join=join,
        extra=".",
    )


@app.route("/meetings")
def meetings():
    context = {
        "server_time": format_server_time()
    }
    return render_template(
        "meetings.html", context=context
    )


@app.route("/meetings/<meetingid>")
def meetingid(meetingid):
    context = {
        "server_time": format_server_time()
    }
    return render_template(
        "meetings.html",
        context=context,
        meetingid=meetingid,
    )


@app.route("/discussions/<sparkroom>")
def discussions(sparkroom):
    context = {
        "server_time": format_server_time()
    }
    return render_template(
        "discussions.html",
        context=context,
        sparkroom=sparkroom,
    )


@app.route("/members/<sparkroom>")
def members(sparkroom):
    context = {
        "server_time": format_server_time()
    }
    return render_template(
        "members.html",
        context=context,
        sparkroom=sparkroom,
    )


@app.route("/profile")
def profile():
    context = {
        "server_time": format_server_time()
    }
    return render_template(
        "profile.html", context=context
    )


@app.route("/js/<path>")
def send_js(path):
    return send_from_directory(
        "./static/js", path
    )


@app.route("/css/<path>")
def send_css(path):
    return send_from_directory(
        "./static/css", path
    )


@app.route("/fonts/<path>")
def send_fonts(path):
    return send_from_directory(
        "./static/fonts", path
    )


@app.route("/img/<path>")
def send_img(path):
    print("using send_img")
    return send_from_directory(
        "./static/img", path
    )


@app.errorhandler(404)
def error404(error):
    context = {
        "server_time": format_server_time()
    }
    return (
        render_template(
            "404.html", context=context
        ),
        404,
    )


if __name__ == "__main__":
    app.run(
        debug=True,
        host="127.0.0.1",
        port=int(
            os.environ.get("PORT", 5004)
        ),
    )
