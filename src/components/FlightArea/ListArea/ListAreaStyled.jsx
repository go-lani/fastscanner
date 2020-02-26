import styled, { keyframes, css } from 'styled-components';
import media from '../../../libs/MediaQuery';
import { lighten, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

export const ListLayout = styled.section`
  flex-basis: 80vw;
  background: #fff;
  padding: 10px 4% 20px 20px;
`;

// Flight Category Tab
export const TabArea = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0 15px;

  ${media.desktop`
    flex-direction: row;
    margin: 5px 0 10px;
  `}
`;

export const CategoryTab = styled.ul`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;

  ${media.desktop`
    flex-basis: 70%;
  `}
`;

export const TabItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  width: 100%;
  min-width: 150px;
  min-height: 100px;
  padding: 10px 20px;
  border: 2px solid #eee;
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  text-align: left;
  word-break: keep-all;
  transition: all 0.3s;
  cursor: pointer;

  & > * {
    align-self: flex-start;
  }

  ${props =>
    props.isActive
      ? css`
          border: 2px solid #042759;
          background: #042759;
          color: #fff;
        `
      : css``}

  & + & {
    margin: 0 0 0 10px;
  }
`;

export const TabPrice = styled.em`
  font-size: 2.2rem;
  color: #0288d1;
  ${props =>
    props.isActive &&
    css`
      color: #fff;
    `}
`;

export const FilterButton = styled.button`
  display: none;
  padding: 10px 20px;
  color: #0288d1;
  font-size: 1.6rem;
  font-weight: 700;
  border: 2px solid #eee;
  border-radius: 5px;
  margin: 0 0 5px;

  &:hover {
    border: 2px solid #0288d1;
  }

  ${media.tablet`
    display: block;
  `}

  ${media.mobile`
    display: block;
  `}
`;

// progress
export const ProgressBox = styled.div`
  ${props =>
    props.loading
      ? css`
          opacity: 0;
        `
      : css`
          opacity: 1;
        `}

  transition: opacity 1s ease-out;
`;

const twincle = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const ProgressTextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 10px;
`;

export const ProgressText = styled.p`
  margin: 0 0 0 10px;
  font-size: 1.4rem;
  animation: ${twincle} infinite 2s linear;
`;

export const Progress = withStyles({
  root: {
    height: 6,
    borderRadius: 20,
    backgroundColor: lighten('#ededed', 0),
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#0288d1',
  },
})(LinearProgress);

// Flight 리스트
export const FlightList = styled.ul``;

export const FlightItem = styled.li`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 0 10px 5px #eee;
  }

  & + & {
    margin-top: 20px;
  }

  ${media.desktop`
    flex-direction: row;
    padding: 20px 0;
  `}
`;

export const FlightInfo = styled.div`
  width: 100%;
  padding: 20px;

  ${media.tablet`
    padding: 30px;
  `}

  ${media.desktop`
    padding: 20px 30px;
    border-right: 1px solid #ededed;
  `}
`;

export const FlightBound = styled.div`
  display: flex;

  & + & {
    margin: 30px 0 0;
    padding: 30px 0 0;
    border-top: 1px dotted #ccc;
  }

  ${media.mobile`
    flex-direction: column;
    & + & {
      margin: 20px 0 0;
      padding: 20px 0 0;
    }
  `}
`;

export const FlightInbound = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const AirlineInfo = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-basis: 10%;
  margin: 0 10px 0 0;

  ${media.mobile`
    margin: 0;
  `}
`;

export const AirlineList = styled.li`
  display: block;
  position: relative;
  width: auto;
  min-width: 60px;
  height: 35px;
  margin: 0;
  white-space: nowrap;

  ${media.mobile`
    display: inline-block;

    & + & {
      margin: 0 0 0 20px;
    }
  `}

  ${media.desktop`
    height: 40px;
  `}

  img {
    height: 100%;
  }

  &:hover {
    p {
      display: inline-block;
    }
  }
`;

export const AirlineName = styled.p`
  display: none;
  position: absolute;
  top: calc(100% + 5px);
  left: 50%;
  min-width: 100%;
  padding: 10px;
  transform: translateX(-50%);
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px 5px #eee;
  text-align: center;
`;

export const FlyInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0;

  ${media.mobile`
    margin: 30px 0 0;
  `}
`;

export const DepartureInfo = styled.div`
  text-align: right;
  word-break: keep-all;
`;

export const DepartureDate = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
`;

export const DepartureTime = styled.p`
  margin: 5px 0 0;
  font-size: 1.6rem;
  font-weight: 600;
`;

export const DeparturePlace = styled.p`
  font-size: 1.5rem;
  margin: 5px 0 0;
`;

const fly = keyframes`
  to {
    transform: translateX(40px);
  }
  from {
    transform: translateX(-49px);
  }
`;

export const FlightTimeInfo = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 20px;
  font-size: 1.2rem;
  text-align: center;
`;

export const ImgOuter = styled.div`
  display: block;
  overflow: hidden;
  padding: 0 12px;

  img {
    width: auto;
    height: 32px;
    animation: ${fly} 3s infinite ease-in-out;
  }

  ${media.mobile`
    display: none;
  `}
`;

export const TimeContainer = styled.div`
  width: 100%;
  margin: 0 10px 0 0;
`;

export const DurationText = styled.p`
  font-size: 1.3rem;
`;

export const StopsInfo = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 100px;
  height: 3px;
  margin: 10px 0;
  border-radius: 5px;
  background: #68697f;

  i {
    position: relative;
    top: -1px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    margin: 0 5px;
    background: #ff0000;
    box-shadow: 0 0 0 0.3rem #fff;
  }
`;

export const StopsDetail = styled.div`
  position: relative;
  cursor: pointer;

  ul {
    display: none;
    position: absolute;
    top: calc(100% + 5px);
    left: 50%;
    min-width: 100%;
    padding: 10px;
    transform: translateX(-50%);
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px 5px #eee;

    li {
      padding: 0 0 0 25px;
      white-space: nowrap;
      font-weight: 500;
      font-size: 1.3rem;
      margin: 10px 0 0;
      text-align: left;
      background: url('/images/flight.png') left center no-repeat;
      background-size: contain;
      &:first-child {
        margin: 0;
      }
    }
  }

  &:hover {
    ul {
      display: inline-block;
    }
  }
`;

export const StopsText = styled.p`
  position: relative;
  font-size: 1.2rem;
  color: #ff0000;
`;

export const ArriveInfo = styled.div`
  font-size: 1.8rem;
  text-align: left;
  word-break: keep-all;
`;

export const ArriveDate = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
`;

export const ArriveTime = styled.p`
  margin: 5px 0 0;
  font-size: 1.6rem;
  font-weight: 600;
`;

export const ArrivePlace = styled.p`
  margin: 5px 0 0;
  font-size: 1.5rem;
`;

export const FlightPrice = styled.div`
  width: 100%;
  padding: 20px 40px;
  border-top: 1px solid #ccc;
  text-align: center;

  p {
    margin-bottom: 10px;
    font-size: 1.4rem;
  }

  em {
    display: block;
    margin: 0 0 10px;
    font-weight: 700;
    font-size: 2.2rem;

    small {
      display: block;
      margin: 5px 0 0;
      font-weight: 400;
      font-size: 1.2rem;
      color: #909090;
    }
  }

  ${media.desktop`
    width: 40%;
    border-top: none;
  `}
`;
