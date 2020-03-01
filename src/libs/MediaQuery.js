import { css } from 'styled-components';

const sizes = {
  desktop: 1025,
  tablet: 1024,
  mobile: 768,
};

const sizeCheck = label => {
  if (label === 'desktop') return `all and (min-width: ${sizes[label]}px)`;
  if (label === 'tablet')
    return `all and (min-width: ${+sizes['mobile'] + 1}px) and (max-width: ${
      sizes[label]
    }px)`;
  if (label === 'mobile') return `all and (max-width: ${sizes[label]}px)`;
};

const media = Object.keys(sizes).reduce((points, label) => {
  points[label] = (...args) => css`
    @media ${sizeCheck(label)} {
      ${css(...args)}
    }
  `;

  return points;
}, {});

export default media;
