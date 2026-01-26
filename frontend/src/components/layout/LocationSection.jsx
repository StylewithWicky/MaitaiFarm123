import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import styles from '@/styles/LocationSection.module.css';

const LocationSection = () => {
const mapUrl ="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63837.013733686515!2d36.4423963!3d-0.09036265000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1829d07df9855825%3A0xf74d7f465116903b!2sMuruai!5e0!3m2!1sen!2ske!4v1768988357260!5m2!1sen!2ske";


  const handleDirections = () => {
  const address = "Mailo Kumi, Ndaragwa, Kenya";
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  
  window.open(googleMapsUrl, "_blank");
};

  return (
    <section id="location-section" className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.infoSide}>
          <h2 className={styles.heading}>Visit Maitai Farm</h2>
          <p className={styles.subheading}>Experience the best of Dorper livestock and natural honey at our farm gate.</p>

          <div className={styles.detailsList}>
            <div className={styles.detailItem}>
              <MapPin className={styles.icon} />
              <div>
                <h4>Address</h4>
                <p>We are Located at Mailo Kumi, Ndaragwa , 15km from Nyahururu Town.</p>
              </div>
            </div>

            <div className={styles.detailItem}>
              <Phone className={styles.icon} />
              <div>
                <h4>Call for Pickups</h4>
                <p>+254 728 581 959</p>
              </div>
            </div>

            <div className={styles.detailItem}>
              <Clock className={styles.icon} />
              <div>
                <h4>Visiting Hours</h4>
                <p>Sun - Mon: 9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>

          <button onClick={handleDirections} className={styles.directionBtn}>
            <Navigation size={18} /> Get Directions
          </button>
        </div>

        <div className={styles.mapSide}>
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Maitai Farm Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;