import styled from 'styled-components';

export const ListLayout = styled.section`
  flex-basis: 70vw;
  min-height: 100vh;
  background: #fff;
  padding: 20px;
`;

export const FlightList = styled.li`
  display: flex;
  padding: 10px 20px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  &:hover {
    border: 1px solid #0288d1;
  }

  & + & {
    margin-top: 20px;
  }
`;

export const FlightInfo = styled.div`
  width: 75%;
  margin: auto 0;
  border-right: 1px solid #ededed;
`;

export const FlightOutbound = styled.div`
  display: flex;
`;

export const FlightInbound = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const AirlineInfo = styled.div`
  display: flex;
  flex-direction: column;
  /* max-width: 3rem; */
  margin: auto 0;
  /* padding: 10px; */
  text-align: center;

  img {
    width: 30px;
    /* width: 100%; */
  }

  span {
    margin-top: 10px;
  }
`;

export const FlyInfo = styled.div`
  display: flex;
  width: 90%;
`;

export const DepartureInfo = styled.div`
  width: 32%;
  margin: auto 0;
  padding: 0 20px;
  text-align: right;
  font-size: 1.8rem;

  p {
    display: block;
    font-weight: 700;
  }

  span {
    display: block;
    font-size: 1.5rem;
  }

  p + span {
    padding-top: 5px;
  }
`;

export const FlightTimeInfo = styled.div`
  display: flex;
  width: 36%;
  margin: auto 0;
  padding: 0 10px;
  font-size: 1.2rem;
  text-align: center;
  position: relative;

  img {
    padding: 10px;
  }
`;

export const TimeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const StopsInfo = styled.ul`
  display: flex;
  justify-content: center;
  background: #68697f;
  width: 100%;
  height: 0.3rem;
  margin: 10px 0;
  border-radius: 5px;

  li {
    position: relative;
    background: red;
    top: -1px;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    margin: 0 10px;
    box-shadow: 0 0 0 0.3rem #fff;
  }
`;

export const ArriveInfo = styled.div`
  width: 32%;
  margin: auto 0;
  padding: 0 20px;
  text-align: left;
  font-size: 1.8rem;

  p {
    display: block;
    font-weight: 700;
  }

  span {
    display: block;
    font-size: 1.5rem;
  }

  p + span {
    padding-top: 5px;
  }
`;

export const FlightPrice = styled.div`
  width: 25%;
  margin: auto;
  padding: 20px;
  text-align: center;

  span {
    display: block;
    margin-bottom: 10px;
    font-size: 1.4rem;
  }

  p {
    font-size: 2.6rem;
    margin-bottom: 10px;
    font-weight: 700;
  }

  button > span {
    display: inline;
  }
`;
