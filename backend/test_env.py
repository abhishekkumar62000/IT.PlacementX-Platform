from decouple import Config, RepositoryEnv

config = Config(RepositoryEnv(".env"))

print("SECRET_KEY =", config("SECRET_KEY"))
print("DB_NAME =", config("DB_NAME"))
print("DB_USER =", config("DB_USER"))
print("DB_PASSWORD =", config("DB_PASSWORD"))