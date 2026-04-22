// src/Resources.js
import React from 'react';
import Header from './inc/Header';
import Footer from './inc/Footer';
import './App.css';

import dccEasternAdventures from './img/resources/dccEasternAdventures.jpg';
import gongFarmer            from './img/resources/gongFarmer.jpg';
import giantsHead            from './img/resources/giantsHead.jpg';
import catRes                from './img/resources/catRes.jpg';
import murtMis               from './img/resources/murtMis.jpg';
import whiteBox              from './img/resources/whiteBox.jpg';

const Resources = () => {
  const resources = [
    {
      id: 1,
      title: 'DCC Eastern Adventures',
      image: dccEasternAdventures,
      link: 'https://www.drivethrurpg.com/product/PRODUCT_ID',
    },
    {
      id: 2,
      title: 'Fantastic Adventures and the Disgruntled Gong Farmer',
      image: gongFarmer,
      link: 'https://www.drivethrurpg.com/product/PRODUCT_ID',
    },
    {
      id: 3,
      title: "Beneath the Giant's Head",
      image: giantsHead,
      link: 'https://www.drivethrurpg.com/product/PRODUCT_ID',
    },
    {
      id: 4,
      title: 'The Cat and the Resurrection',
      image: catRes,
      link: 'https://www.drivethrurpg.com/product/PRODUCT_ID',
    },
    {
      id: 5,
      title: "Murt's Miscalculation",
      image: murtMis,
      link: 'https://www.drivethrurpg.com/product/PRODUCT_ID',
    },
    {
      id: 6,
      title: 'White Box Eastern Adventures',
      image: whiteBox,
      link: 'https://www.drivethrurpg.com/product/PRODUCT_ID',
    },
  ];

  return (
    <div className="App" id="top">
      <Header />
      <main className="main-content">
        <div className="resources-page">

          <h1 className="resources-section-title">Resources</h1>

          <p className="resources-description">
            The following links are Dungeon Crawl Classics modules and an OSR system
            (White Box Eastern Adventures) I designed. These resources are available
            as free PDFs on DriveThruRPG.
          </p>

          <section className="resource-covers">
            {resources.map((resource) => (
              <a
                key={resource.id}
                className="resource-cover"
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="resource-content-container">
                  <div className="resource-image-wrap">
                    <div className="resource-image">
                      <img
                        src={resource.image}
                        alt={resource.title}
                        className="resource-img"
                      />
                    </div>
                  </div>
                  <div className="resource-details-wrap">
                    <div className="resource-item-title">{resource.title}</div>
                  </div>
                </div>
              </a>
            ))}
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;