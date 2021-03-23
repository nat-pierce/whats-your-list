import { PureComponent } from "react";

export default class Logo extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            color1: '#DFDFDD',
            color2: '#FFF88B'
        }

        this.intervalId = null;
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState({ color1: this.state.color2, color2: this.state.color1 });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        const { color1, color2 } = this.state;

        return ( 
            <svg width="575px" height="169px" viewBox="0 0 575 169" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs>
                    <circle id="path-1" cx="12" cy="62" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-2">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-3" cx="50" cy="68" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-4">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-5" cx="88" cy="68" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-6">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-7" cx="126" cy="68" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-8">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-9" cx="164" cy="68" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-10">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-11" cx="202" cy="68" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-12">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-13" cx="240" cy="68" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-14">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-15" cx="274" cy="68" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-16">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-17" cx="6" cy="24" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-18">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-19" cx="12" cy="62" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-20">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-21" cx="50" cy="68" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-22">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-23" cx="88" cy="68" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-24">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-25" cx="126" cy="68" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-26">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-27" cx="164" cy="68" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-28">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-29" cx="202" cy="68" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-30">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-31" cx="238" cy="68" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-32">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-33" cx="6" cy="24" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-34">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-35" cx="12" cy="44" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-36">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-37" cx="50" cy="50" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-38">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-39" cx="88" cy="50" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-40">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-41" cx="126" cy="50" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-42">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-43" cx="164" cy="50" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-44">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-45" cx="202" cy="50" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-46">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-47" cx="240" cy="50" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-48">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-49" cx="274" cy="50" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-50">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-51" cx="6" cy="6" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-52">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-53" cx="12" cy="44" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-54">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-55" cx="50" cy="50" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-56">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-57" cx="88" cy="50" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-58">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-59" cx="126" cy="50" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-60">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-61" cx="164" cy="50" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-62">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-63" cx="202" cy="50" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-64">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-65" cx="238" cy="50" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-66">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <circle id="path-67" cx="6" cy="6" r="6"></circle>
                    <filter x="-187.5%" y="-187.5%" width="475.0%" height="475.0%" filterUnits="objectBoundingBox" id="filter-68">
                        <feMorphology radius="2.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.974536002   0 0 0 0 0.472581327  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                </defs>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Marquee" transform="translate(9.000000, 9.000000)">
                        <rect id="Rectangle" fill="#C60000" x="0" y="0" width="560" height="152" rx="33"></rect>
                        <rect id="Rectangle" stroke="#9B0404" stroke-width="4" fill="#FFFFFF" x="26" y="25" width="508" height="102" rx="9"></rect>
                        <g id="BottomRightLights" transform="translate(411.000000, 108.000000) scale(-1, 1) translate(-411.000000, -108.000000) translate(271.000000, 71.000000)">
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-2)" xlinkHref="#path-1"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-1"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="31" cy="68" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-4)" xlinkHref="#path-3"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-3"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="69" cy="68" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-6)" xlinkHref="#path-5"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-5"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="107" cy="68" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-8)" xlinkHref="#path-7"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-7"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="145" cy="68" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-10)" xlinkHref="#path-9"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-9"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="183" cy="68" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-12)" xlinkHref="#path-11"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-11"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="221" cy="68" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-14)" xlinkHref="#path-13"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-13"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="257" cy="68" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-16)" xlinkHref="#path-15"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-15"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="6" cy="43" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-18)" xlinkHref="#path-17"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-17"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="6" cy="4" r="6"></circle>
                        </g>
                        <g id="BottomLeftLights" transform="translate(6.000000, 71.000000)">
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-20)" xlinkHref="#path-19"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-19"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="31" cy="68" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-22)" xlinkHref="#path-21"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-21"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="69" cy="68" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-24)" xlinkHref="#path-23"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-23"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="107" cy="68" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-26)" xlinkHref="#path-25"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-25"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="145" cy="68" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-28)" xlinkHref="#path-27"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-27"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="183" cy="68" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-30)" xlinkHref="#path-29"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-29"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="221" cy="68" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-32)" xlinkHref="#path-31"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-31"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="255" cy="68" r="6"></circle>
                            <circle id="Oval" fill={color1} cx="6" cy="43" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-34)" xlinkHref="#path-33"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-33"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="6" cy="4" r="6"></circle>
                        </g>
                        <g id="TopRightLights" transform="translate(411.000000, 34.000000) scale(-1, -1) translate(-411.000000, -34.000000) translate(271.000000, 6.000000)">
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-36)" xlinkHref="#path-35"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-35"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="31" cy="50" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-38)" xlinkHref="#path-37"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-37"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="69" cy="50" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-40)" xlinkHref="#path-39"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-39"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="107" cy="50" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-42)" xlinkHref="#path-41"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-41"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="145" cy="50" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-44)" xlinkHref="#path-43"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-43"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="183" cy="50" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-46)" xlinkHref="#path-45"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-45"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="221" cy="50" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-48)" xlinkHref="#path-47"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-47"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="257" cy="50" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-50)" xlinkHref="#path-49"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-49"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="6" cy="25" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-52)" xlinkHref="#path-51"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-51"></use>
                            </g>
                        </g>
                        <g id="TopLeftLights" transform="translate(136.500000, 34.000000) scale(1, -1) translate(-136.500000, -34.000000) translate(6.000000, 6.000000)">
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-54)" xlinkHref="#path-53"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-53"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="31" cy="50" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-56)" xlinkHref="#path-55"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-55"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="69" cy="50" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-58)" xlinkHref="#path-57"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-57"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="107" cy="50" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-60)" xlinkHref="#path-59"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-59"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="145" cy="50" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-62)" xlinkHref="#path-61"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-61"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="183" cy="50" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-64)" xlinkHref="#path-63"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-63"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="221" cy="50" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-66)" xlinkHref="#path-65"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-65"></use>
                            </g>
                            <circle id="Oval" fill={color1} cx="255" cy="50" r="6"></circle>
                            <circle id="Oval" fill={color1} cx="6" cy="25" r="6"></circle>
                            <g id="Oval">
                                <use fill="black" fill-opacity="1" filter="url(#filter-68)" xlinkHref="#path-67"></use>
                                <use fill={color2} fill-rule="evenodd" xlinkHref="#path-67"></use>
                            </g>
                        </g>
                        <path d="M28.5,44 L532.5,44" id="Line" stroke="#5C5C5C" stroke-linecap="square"></path>
                        <path d="M28.5,76 L532.5,76" id="Line" stroke="#5C5C5C" stroke-linecap="square"></path>
                        <path d="M28.5,109 L532.5,109" id="Line" stroke="#5C5C5C" stroke-linecap="square"></path>
                        <text id="What’s-Your-List?" font-family="BebasNeue-Regular, Bebas Neue" font-size="82" font-weight="normal" fill="#000000">
                            <tspan x="44" y="105">What’s Your List?</tspan>
                        </text>
                    </g>
                </g>
            </svg>
        )
    }
}