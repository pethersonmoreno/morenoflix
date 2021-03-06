/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import SlickSlider from 'react-slick';
import styled from 'styled-components';

const Container = styled.ul`
  padding: 0;
  margin: 0;
  .slick-prev,
  .slick-next {
    z-index: 50;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 30px;
    height: 30px;
    transform: initial;
    &:before {
      font-size: 30px;
      color: ${props => (props.color ? props.color : '#fff')};
    }
  }

  .slick-prev {
    left: 0;
  }
  .slick-next {
    right: 16px;
  }
`;

export const SliderItem = styled.li`
  margin-right: 16px;
  img {
    margin: 16px;
    width: 298px;
    height: 197px;
    object-fit: cover;
  }
`;
type TChildElement = React.ReactElement<React.HTMLAttributes<HTMLElement>> | null | undefined;
type TParamsSlider = {
  children: Array<TChildElement> | TChildElement;
  color: string;
};

const Slider = ({ children, color }: TParamsSlider) => (
  <Container color={color}>
    <SlickSlider
      {...{
        dots: false,
        infinite: true,
        speed: 300,
        centerMode: false,
        variableWidth: true,
        adaptiveHeight: true,
      }}
    >
      {children}
    </SlickSlider>
  </Container>
);
const ChildElement = PropTypes.oneOfType([PropTypes.element, PropTypes.bool, PropTypes.string]);
Slider.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([ChildElement, PropTypes.arrayOf(ChildElement)]).isRequired,
};

export default Slider;
