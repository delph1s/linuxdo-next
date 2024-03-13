export const fetchGetPost = () => {
  fetch("https://linux.do/posts/26642.json", {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "discourse-logged-in": "true",
      "discourse-present": "true",
      "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Microsoft Edge\";v=\"121\", \"Chromium\";v=\"121\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "x-csrf-token": "gCV68uaSEWdGZVQww4DLcqAd4LeN2UQpY9meS_uQ0Wuz_3AKUn18-o7t56iruIVcK2PYGb2bexVePGaMiRL92g",
      "x-requested-with": "XMLHttpRequest"
    },
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "omit"
  });
}
