import buffer from "buffer";
import { AsyncStorage } from "react-native";
import { _ } from "lodash";

const authKey = "auth";
const userKey = "user";
class AuthService {
  getAuthInfo(cb) {
    AsyncStorage.multiGet([authKey, userKey], (err, val) => {
      if (err) {
        return cb(err);
      }
      if (!val) {
        return cb();
      }

      var authInfo = {
        header: {
          Authorization: "Basic " + val[0][1]
        },
        user: JSON.parse(val[1][1])
      };
      return cb(null, authInfo);
    });
  }

  login(creds, cb) {
    var b = new buffer.Buffer(creds.username + ":" + creds.password);
    var encodedAuth = b.toString("base64");

    fetch("https://api.github.com/user", {
      headers: {
        Authorization: "Basic " + encodedAuth
      }
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }
        throw {
          badCredentials: response.status == 401,
          unknownError: response.status != 401
        };
      })
      .then(response => {
        return response.json();
      })
      .then(results => {
        console.log("Storing in AsyncStorage:" + encodedAuth);
        AsyncStorage.multiSet(
          [[authKey, encodedAuth], [userKey, JSON.stringify(results)]],
          err => {
            if (err) {
              throw err;
            }
            return cb({ success: true });
          }
        );
        console.log(
          "Value of AuthKey in AsyncStorage:" +
            JSON.stringify(AsyncStorage.getItem(authKey))
        );
      })
      .catch(err => {
        console.log("logon failed: " + err);
        return cb(err);
      })
      .finally(() => {
        return cb({ showProgress: false });
      });
  }
}
export default new AuthService();
