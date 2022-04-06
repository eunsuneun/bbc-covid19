// 전역변수 사용을 회피하기 위해 즉시실행 함수
(() => {
  const $stepElems = document.querySelectorAll(".step");
  const $graphicElems = document.querySelectorAll(".graphic-item");
  let currentElem = $graphicElems[0];
  let ioIndex;
  const io = new IntersectionObserver((entries, observer) => {
    // 관찰 대상이 사라지거나 없어질 때 콜백함수가 실행됨.
    ioIndex = entries[0].target.dataset.index * 1;
    console.log("ioIndex", ioIndex);
  });
  const actions = {
    birdFlies(key) {
      if (key) {
        document.querySelector(
          '[data-index="2"] .bird'
        ).style.transform = `translateX(${window.innerWidth}px)`;
      } else {
        document.querySelector(
          '[data-index="5"] .bird'
        ).style.transform = `translateX(-100%)`;
      }
    },
    birdFlies2(key) {
      if (key) {
        document.querySelector(
          '[data-index="5"] .bird'
        ).style.transform = `translate(${window.innerWidth}px, ${
          -window.innerHeight * 0.7
        }px)`;
      } else {
        document.querySelector(
          '[data-index="5"] .bird'
        ).style.transform = `translateX(-100%)`;
      }
    },
  };
  for (let i = 0; i < $stepElems.length; i++) {
    io.observe($stepElems[i]);
    $stepElems[i].dataset.index = i;
    $graphicElems[i].dataset.index = i;
  }
  const activate = (action) => {
    currentElem.classList.add("visible");
    if (action) {
      actions[action](true);
    }
  };
  const inActivate = (action) => {
    currentElem.classList.remove("visible");
    if (action) {
      actions[action](false);
    }
  };
  window.addEventListener("scroll", () => {
    let step;
    let boundingRect;
    let temp = 0;
    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = $stepElems[i];
      if (!step) continue;
      boundingRect = step.getBoundingClientRect();
      temp++;
      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        inActivate(currentElem.dataset.action);
        currentElem = $graphicElems[step.dataset.index];
        activate(currentElem.dataset.action);
      }
    }
    console.log("temp", temp);
  });
  window.addEventListener("load", () => {
    setTimeout(() => scrollTo(0, 0), 100);
  });
  activate();
})();
