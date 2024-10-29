import React from "react";
import styled from "styled-components";
// Components
import ProjectBox from "../Elements/ProjectBox";
import FullButton from "../Buttons/FullButton";


export default function Projects() {
  return (
    <Wrapper id="projects">
      <div className="whiteBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Videos informativos</h1>
            <p className="font13">
              Te invitamos a explorar los diferentes recursos que ofrece Norte del Cauca Cómo Vamos y a ser parte de la construcción de un futuro mejor para la región.
            </p>
            
          </HeaderInfo>
          <div className="row textCenter">
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <div className="videoWrapper">
                <iframe
                  width="376"
                  height="309"
                  src="https://www.youtube.com/embed/ZCc4ag6o9M4"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <ProjectBox
                title="#1"
                text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."

              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <div className="videoWrapper">
                <iframe
                  width="376"
                  height="309"
                  src="https://www.youtube.com/embed/ZCc4ag6o9M4"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <ProjectBox
                title="#2"
                text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."

              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <div className="videoWrapper">
                <iframe
                  width="376"
                  height="309"
                  src="https://www.youtube.com/embed/ZCc4ag6o9M4"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <ProjectBox
                title="#3"
                text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."

              />
            </div>
          </div>
          <div className="row flexCenter">
            <div style={{ margin: "50px 0", width: "200px" }}>
              <FullButton title="Cargar más" action={() => alert("clicked")} />
            </div>
          </div>
        </div>
      </div>


      
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const HeaderInfo = styled.div`
  margin-bottom: 50px;
  @media (max-width: 860px) {
    text-align: center;
  }
`;


