import React, { Component } from 'react';
import { config } from "react-spring";
import Carousel from 'react-spring-3d-carousel';

import './BoomCarousel.css';

export default class BoomCarousel extends Component {
    constructor(props) {
        super(props);

        this.slides = props.slides.map((slide, index) => {
            return {
                ...slide,
                onClick: () => {
                    if (this.state.goToSlide === index) {
                        this.onSelected(slide.key);
                    }
                    this.setState({ goToSlide: index });
                }
            };
        });
    }

    state = {
        goToSlide: 0,
    };

    onSelected(key) {
        if (this.props.onSelected) {
            this.props.onSelected(key);
        }
    }

    moveRight() {
        let slide = this.state.goToSlide;
        slide++;
        if (slide === this.slides.length) {
            slide = 0;
        }
        this.setState({ goToSlide: slide });
    }

    moveLeft() {
        let slide = this.state.goToSlide;
        slide--;
        if (slide < 0) {
            slide = this.slides.length - 1;
        }
        this.setState({ goToSlide: slide });
    }

    select() {
        this.onSelected(this.slides[this.state.goToSlide].key);
    }

    render() {
        return (
            <Carousel
                slides={this.slides}
                offsetRadius={2}
                animationConfig={config.gentle}
                goToSlide={this.state.goToSlide}
            />
        )
    }
}
