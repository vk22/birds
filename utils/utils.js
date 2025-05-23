export default {
  numberFormate(n) {
    return (n + "")
      .split("")
      .reverse()
      .join("")
      .replace(/(\d{3})/g, "$1 ")
      .split("")
      .reverse()
      .join("")
      .replace(/^ /, "");
  },
  numberWithSpaces(x) {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    } else {
      return 0;
    }
  },
  declOfNum(number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  },
  isElemVisible(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top; // 200 = buffer
    var elemBottom = rect.bottom;
    return elemTop < window.innerHeight && elemBottom >= 0;
  },
  handleScroll() {
    var interval = 250;
    var interval2 = 500;
    var interval3 = 250;
    var fadeInElements0 = Array.from(
      document.getElementsByClassName("fade-in-0")
    );
    var fadeInElements = Array.from(document.getElementsByClassName("fade-in"));
    var fadeInElements2 = Array.from(
      document.getElementsByClassName("fade-in-2")
    );

    for (let i = 0; i < fadeInElements0.length; i++) {
      setTimeout(
        function () {
          var elem = fadeInElements0[i];
          if (this.isElemVisible(elem)) {
            //console.log('elem ', elem)
            elem.style.opacity = "1";
            elem.style.transform = "translateY(0px)";
            //elem.classList.add("show")
            //fadeInElements.splice(i, 1) // only allow it to run once
          }
        }.bind(this),
        i * interval
      );
    }

    for (let i = 0; i < fadeInElements.length; i++) {
      setTimeout(
        function () {
          var elem = fadeInElements[i];
          if (this.isElemVisible(elem)) {
            //console.log('elem ', elem)
            elem.style.opacity = "1";
            elem.style.transform = "translateY(0px)";
            //elem.classList.add("show")
            //fadeInElements.splice(i, 1) // only allow it to run once
          }
        }.bind(this),
        i * interval
      );
    }

    for (let i = 0; i < fadeInElements2.length; i++) {
      setTimeout(
        function () {
          var elem = fadeInElements2[i];
          if (this.isElemVisible(elem)) {
            //console.log('elem ', elem)
            elem.style.opacity = "1";
            if (window.outerWidth < 668) {
              elem.style.transform = "translateY(0px) translateX(0%)";
            } else {
              elem.style.transform = "translateY(0px) translateX(-50%)";
            }

            //elem.classList.add("show")
            //fadeInElements.splice(i, 1) // only allow it to run once
          }
        }.bind(this),
        interval3
      );
    }
  },
};
