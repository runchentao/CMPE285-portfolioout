# Getting Started

This server was implement with [Flask](https://flask.palletsprojects.com/en/2.0.x/installation/).

## Install dependencies

1. You need to have `python3`, `pip` installed first
2. In `flask-backend/` dir, run `python3 -m venv venv` to create a virtual env
3. Run `. venv/bin/activate` to activate venv
4. In `(venv)`, run `pip install Flask`, and `pip install flask-restful`
5. Run 
```
$ export FLASK_APP=server.py
$ flask run
```
If you see `* Running on http://127.0.0.1:5000/` then it works