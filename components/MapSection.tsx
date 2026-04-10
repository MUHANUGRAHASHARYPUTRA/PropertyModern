'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, Navigation, Map as MapIcon, AlertCircle } from 'lucide-react';

const mapStyles = [
  {
    "featureType": "all",
    "elementType": "geometry.fill",
    "stylers": [{"weight": "2.00"}]
  },
  {
    "featureType": "all",
    "elementType": "geometry.stroke",
    "stylers": [{"color": "#9c9c9c"}]
  },
  {
    "featureType": "all",
    "elementType": "labels.text",
    "stylers": [{"visibility": "on"}]
  },
  {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [{"color": "#f2f2f2"}]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry.fill",
    "stylers": [{"color": "#ffffff"}]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [{"color": "#ffffff"}]
  },
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [{"visibility": "off"}]
  },
  {
    "featureType": "road",
    "elementType": "all",
    "stylers": [{"saturation": -100}, {"lightness": 45}]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [{"color": "#eeeeee"}]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#7b7b7b"}]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [{"color": "#ffffff"}]
  },
  {
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [{"visibility": "simplified"}]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.icon",
    "stylers": [{"visibility": "off"}]
  },
  {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [{"visibility": "off"}]
  },
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": [{"color": "#46bcec"}, {"visibility": "on"}]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [{"color": "#c8d7d4"}]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#070707"}]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [{"color": "#ffffff"}]
  }
];

const center = { lat: -5.208151, lng: 119.472288 }; // Approximate coordinates for the provided link
const mapLink = "https://maps.app.goo.gl/RTvTQ4skZyijpptdA?g_st=ic";

export default function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "200px" });
  const [mapError, setMapError] = useState(false);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  const calculateRoute = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
        if (!apiKey) {
          alert("Google Maps API key is missing.");
          return;
        }

        const loader = new Loader({
          apiKey,
          version: "weekly",
        });

        const routesLibrary = await (loader as any).importLibrary("routes");
        const DirectionsService = routesLibrary.DirectionsService;
        const DirectionsRenderer = routesLibrary.DirectionsRenderer;
        
        const directionsService = new DirectionsService();
        
        const origin = { lat: position.coords.latitude, lng: position.coords.longitude };
        
        const results = await directionsService.route({
          origin: origin,
          destination: center,
          travelMode: (window as any).google.maps.TravelMode.DRIVING,
        });

        setDirectionsResponse(results);
        if (results.routes[0].legs[0]) {
          setDistance(results.routes[0].legs[0].distance?.text || '');
          setDuration(results.routes[0].legs[0].duration?.text || '');
        }

        // We need to render the route on the map
        if ((window as any).googleMapInstance) {
          if (!(window as any).directionsRenderer) {
            (window as any).directionsRenderer = new DirectionsRenderer({
              map: (window as any).googleMapInstance,
              suppressMarkers: false,
            });
          }
          const renderer = (window as any).directionsRenderer;
          renderer.setDirections(results);
        }

      } catch (error) {
        console.error("Error calculating route:", error);
        alert("Gagal menghitung rute. Pastikan Anda memberikan izin lokasi.");
      }
    }, () => {
      alert("Gagal mendapatkan lokasi Anda. Pastikan izin lokasi diberikan.");
    });
  };

  useEffect(() => {
    if (!isInView || !mapRef.current) return;

    const initMap = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
        if (!apiKey) {
          console.warn("Google Maps API key is missing. Using fallback.");
          setMapError(true);
          return;
        }

        const loader = new Loader({
          apiKey,
          version: "weekly",
          libraries: ["places", "geometry"]
        });

        const { Map } = await (loader as any).importLibrary("maps");
        const { Marker } = await (loader as any).importLibrary("marker");

        const mapInstance = new Map(mapRef.current!, {
          center,
          zoom: 14,
          styles: mapStyles,
          disableDefaultUI: true,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM,
          },
          mapTypeControl: true,
          mapTypeControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT,
          },
          gestureHandling: "cooperative",
        });
        
        (window as any).googleMapInstance = mapInstance;

        // Add main marker
        new Marker({
          position: center,
          map: mapInstance,
          title: "Grand Estate",
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#C9A96E",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#ffffff",
          }
        });

      } catch (error) {
        console.error("Error loading Google Maps:", error);
        setMapError(true);
      }
    };

    initMap();
  }, [isInView]);

  const facilities = [
    { id: 'school', label: 'Sekolah / Univ', icon: '🏫' },
    { id: 'hospital', label: 'Rumah Sakit', icon: '🏥' },
    { id: 'mall', label: 'Pusat Perbelanjaan', icon: '🛍️' },
    { id: 'market', label: 'Minimarket', icon: '🛒' },
  ];

  return (
    <section id="lokasi" className="py-24 bg-brand-ivory dark:bg-brand-dark" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal dark:text-brand-ivory mb-4">
              lokasi <span className="text-brand-gold italic">strategis</span>
            </h2>
            <p className="text-brand-charcoal/70 dark:text-brand-ivory/70 max-w-xl">
              Terletak di pusat perkembangan kota dengan akses mudah ke berbagai fasilitas umum dan infrastruktur transportasi.
            </p>
          </div>
          <button 
            onClick={calculateRoute}
            className="flex items-center gap-2 px-6 py-3 bg-brand-gold text-white hover:bg-brand-gold/90 transition-colors font-medium rounded-full"
          >
            <Navigation className="w-4 h-4" />
            Hitung Rute ke Lokasi
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="relative w-full h-[480px] rounded-2xl overflow-hidden shadow-2xl border border-brand-charcoal/10 dark:border-brand-ivory/10 bg-brand-offwhite dark:bg-brand-dark-surface">
          
          {/* Map Container */}
          {mapError ? (
            <div className="absolute inset-0 w-full h-full">
              <iframe 
                src={`https://maps.google.com/maps?q=Bukit+Panaikang+Residence&z=15&output=embed`}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-brand-dark/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-brand-charcoal/10 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-medium">Mode Peta Sederhana</span>
                <a 
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-sm text-brand-gold hover:underline font-medium"
                >
                  Buka di Aplikasi
                </a>
              </div>
            </div>
          ) : (
            <div ref={mapRef} className="w-full h-full" />
          )}

          {/* Floating Facilities Panel */}
          <div className="absolute top-4 left-4 bg-white/90 dark:bg-brand-dark/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-brand-charcoal/5 dark:border-brand-ivory/5 max-w-[280px]">
            <h4 className="font-serif font-medium mb-3 text-sm">Fasilitas Terdekat</h4>
            <div className="grid grid-cols-2 gap-2">
              {facilities.map(fac => (
                <button 
                  key={fac.id}
                  onClick={() => setActiveLayer(activeLayer === fac.id ? null : fac.id)}
                  className={`flex items-center gap-2 text-xs p-2 rounded-lg border transition-colors ${
                    activeLayer === fac.id 
                      ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' 
                      : 'border-brand-charcoal/10 dark:border-brand-ivory/10 hover:border-brand-gold/50'
                  }`}
                >
                  <span>{fac.icon}</span>
                  <span className="truncate">{fac.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Distance Matrix Table */}
        <div className="mt-12 bg-white dark:bg-brand-dark-surface p-6 md:p-8 rounded-2xl shadow-lg border border-brand-charcoal/5 dark:border-brand-ivory/5">
          <h3 className="text-2xl font-serif mb-6">Aksesibilitas Lokasi</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-brand-charcoal/10 dark:border-brand-ivory/10 text-brand-charcoal/50 dark:text-brand-ivory/50 text-sm">
                  <th className="pb-4 font-medium">Fasilitas Utama</th>
                  <th className="pb-4 font-medium">Jarak</th>
                  <th className="pb-4 font-medium">Waktu Tempuh</th>
                  <th className="pb-4 font-medium">Mode</th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-base">
                {[
                  { name: 'Bandara Internasional', dist: '15 km', time: '25 mnt', icon: '✈️' },
                  { name: 'Pusat Kota / CBD', dist: '8 km', time: '15 mnt', icon: '🏢' },
                  { name: 'Rumah Sakit Pusat', dist: '3 km', time: '8 mnt', icon: '🏥' },
                  { name: 'Pintu Tol Terdekat', dist: '2 km', time: '5 mnt', icon: '🛣️' },
                ].map((item, i) => (
                  <tr key={i} className="border-b border-brand-charcoal/5 dark:border-brand-ivory/5 last:border-0">
                    <td className="py-4 flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </td>
                    <td className="py-4 text-brand-charcoal/70 dark:text-brand-ivory/70">{item.dist}</td>
                    <td className="py-4 text-brand-gold font-medium">{item.time}</td>
                    <td className="py-4 text-brand-charcoal/50 dark:text-brand-ivory/50">Mobil</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
