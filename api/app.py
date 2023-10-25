from src import create_app

if __name__ == "__main__":
    app = create_app()
    app.secret_key = 'super secret key'
    app.run(debug=True)
