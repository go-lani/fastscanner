import React from 'react';
import qs from 'query-string';
import * as S from './ListAreaStyled';
import Button from '../../Common/Button';
import Boundinfo from './Boundinfo';
import { withRouter } from 'react-router';
import CircleProgress from '../../Common/CircleProgress';

const PendingItem = React.memo(
  ({ Outbound, Inbound, price, agentUrl, amount, location }) => {
    const { children, adults } = qs.parse(location.search);
    const regExp = /\B(?=(\d{3})+(?!\d))/g;

    return (
      <>
        <S.FlightItem>
          <S.FlightInfo>
            <Boundinfo title="출국정보" info={Outbound} />
            {Inbound && <Boundinfo title="입국정보" info={Inbound} />}
          </S.FlightInfo>
          <S.FlightPrice>
            <p>총 {amount}건 중 최저가</p>
            <em>
              <span>
                <i>
                  <CircleProgress disableShrink size={20} />
                </i>
                ₩ {price.replace(regExp, ',')}
              </span>
              {+adults + +children >= 2 && (
                <small>
                  (1인당 약 ₩
                  {Math.round(price / (+adults + +children))
                    .toString()
                    .replace(regExp, ',')}
                  )
                </small>
              )}
            </em>
            <Button
              as="a"
              href={agentUrl}
              text="예약하기"
              size="small"
              color="blue"
              image="plane"
              style={{ color: '#fff' }}
              target="_blank"
            />
          </S.FlightPrice>
        </S.FlightItem>
      </>
    );
  },
);

export default withRouter(PendingItem);
