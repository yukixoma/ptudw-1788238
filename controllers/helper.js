function createStars(stars) {
  let faStart = ``;
  for (let i = 1; i <= stars; i++) {
    faStart += `<i class="fa fa-star"></i>`;
  }
  for (let i = 5; i > stars; i--) {
    faStart += `<i class="far fa-star"></i>`;
  }
  return faStart;
}

function createStarList(stars = []) {
  const starList = stars.map((reviewCount, index) => {
    return `
        <li><a href="#">
            ${index + 1} Star 
            ${createStars(index + 1)}
            ${reviewCount}
        </a></li>
      `;
  });
  return `
    <ul class="list">
        ${starList.reverse().join("")}
    </ul>
  `;
}

module.exports = { createStarList, createStars };
