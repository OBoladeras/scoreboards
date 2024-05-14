import os
import json


class Config:
    def __init__(self):
        self.config_file = "scoreboard.conf"

        if not os.path.exists("data.json"):
            with open("data.json", "w") as f:
                json.dump({}, f)

    def load(self):
        if not os.path.exists(self.config_file):
            print("Config file not found, using default values")
        else:
            with open(self.config_file, "r") as f:
                for line in f:
                    if not line.startswith("#"):
                        if line.startswith("host"):
                            self.host = line.split("=")[1].strip()
                        if line.startswith("port"):
                            self.port = int(line.split("=")[1].strip())
                        if line.startswith("debug"):
                            self.debug = line.split("=")[1].strip()
                        if line.startswith("scoreboard_center"):
                            self.scoreboard_center = line.split("=")[1].strip()
                        if line.startswith("scoreboard_res"):
                            self.scoreboard_res = line.split("=")[1].strip().split("x")

        print(f"Config loaded: {self.host}:{self.port}")
        if not self.debug:
            print("\n\n")

        return self

    def sport_config(self, sport):
        if not os.path.exists(f"sports_config/{sport}.json"):
            print(f"\nSport '{sport}' not found in sports_config folder")
            print("You can create a new sport configuration file in sports_config folder")
            print("A example file can be found on github repository")
            return None

        with open(f"sports_config/{sport}.json", "r") as f:
            return json.load(f)
