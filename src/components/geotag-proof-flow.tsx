import React, { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Camera,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Info,
  MapPin,
  Plus,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  SwitchCamera,
  Trash2,
  X,
  UploadCloud,
  Send,
} from "lucide-react";

export interface GeotaggedPhoto {
  id: string;
  dataUrl: string;
  timestamp: string;
  locationName: string;
  coords: string;
  lat: number;
  lng: number;
}

// -----------------------------------------------------------------------
// 1. Full Geotag Proof Submission Modal
// -----------------------------------------------------------------------
export function GeotagProofModal({
  open,
  onClose,
  onSubmitSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSubmitSuccess: (count: number) => void;
}) {
  const [photos, setPhotos] = useState<GeotaggedPhoto[]>([]);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [congratsOpen, setCongratsOpen] = useState(false);
  const [deviceLocation, setDeviceLocation] = useState({
    lat: 13.0489,
    lng: 80.252,
    accuracy: 5.0,
    address: "Semmozhi Poonga, Cathedral Rd, Chennai, Tamil Nadu 600086",
    locationName: "Semmozhi Poonga, Chennai",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch real current device position on mount
  useEffect(() => {
    if (!open) return;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = Number(pos.coords.latitude.toFixed(5));
          const lng = Number(pos.coords.longitude.toFixed(5));
          const accuracy = Number((pos.coords.accuracy || 5).toFixed(1));
          let address = `${lat}° N, ${lng}° E`;
          let locationName = "Current Location";

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
              { headers: { "Accept-Language": "en" } },
            );
            if (res.ok) {
              const data = await res.json();
              if (data?.display_name) {
                address = data.display_name;
                const a = data.address || {};
                locationName =
                  a.suburb || a.neighbourhood || a.road || a.city || a.town || a.village || "Current Location";
              }
            }
          } catch {}

          setDeviceLocation({
            lat,
            lng,
            accuracy,
            address,
            locationName,
          });
        },
        () => {},
        { enableHighAccuracy: true, timeout: 8000 },
      );
    }
  }, [open]);

  if (!open) return null;

  function handleAddPhoto(photo: GeotaggedPhoto) {
    setPhotos((prev) => [...prev, photo]);
    setCameraOpen(false);
  }

  function handleRemovePhoto(id: string) {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  }

  function handleConfirmSubmit() {
    setWarningOpen(false);
    setCongratsOpen(true);
    onSubmitSuccess(photos.length);
  }

  function handleDone() {
    setCongratsOpen(false);
    setPhotos([]);
    onClose();
  }

  // Handle local file upload with auto-geotag stamping
  function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || !files.length) return;

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = 800;
          canvas.height = 600;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          // Draw uploaded image
          ctx.drawImage(img, 0, 0, 800, 600);

          // Draw Geotag Stamp Watermark with verified device location
          drawGeotagStamp(
            ctx,
            800,
            600,
            "Sangamam Community · Palm Seeds Plantation",
            deviceLocation.address,
            `${deviceLocation.lat}° N, ${deviceLocation.lng}° E · ±${deviceLocation.accuracy}m`,
            new Date().toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          );

          const stampedUrl = canvas.toDataURL("image/jpeg", 0.9);
          const newPhoto: GeotaggedPhoto = {
            id: `photo-${Date.now()}-${index}`,
            dataUrl: stampedUrl,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            locationName: deviceLocation.locationName,
            coords: `${deviceLocation.lat}° N, ${deviceLocation.lng}° E`,
            lat: deviceLocation.lat,
            lng: deviceLocation.lng,
          };
          setPhotos((prev) => [...prev, newPhoto]);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  }

  return (
    <div className="ma-proof-flow-overlay" role="dialog" aria-modal="true">
      <div className="ma-proof-flow-modal">
        {/* Header */}
        <header className="ma-proof-flow-header">
          <button
            type="button"
            className="ma-proof-flow-back-btn"
            onClick={onClose}
            aria-label="Back"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="ma-proof-flow-title-wrap">
            <h2>Upload Event Proof</h2>
            <p>Sangamam Community · Palm Seeds Plantation</p>
          </div>
          <span
            className={`ma-proof-count-badge ${photos.length >= 1 ? "is-valid" : "is-pending"}`}
          >
            {photos.length} Photo{photos.length !== 1 ? "s" : ""}
          </span>
        </header>

        {/* Scrollable Body */}
        <div className="ma-proof-flow-body">
          {/* 1. Instruction Card at Top */}
          <div className="ma-proof-instruction-card">
            <div className="ma-proof-instruction-icon">
              <Info size={20} />
            </div>
            <div className="ma-proof-instruction-text">
              <h3>Instruction by Admin</h3>
              <ul>
                <li>
                  <strong>Minimum 1 photo required</strong> (Recommended 2–5 photos for fast approval).
                </li>
                <li>
                  <strong>GPS Geotag required:</strong> Live camera automatically embeds verified coordinates, timestamp, mini map &amp; Maatram seal.
                </li>
                <li>
                  <strong>Visible activity:</strong> Ensure your face, active plantation work, or volunteer badge is visible in clear daylight.
                </li>
              </ul>
            </div>
          </div>

          {/* 2. Center Big Photo Frame / Capture Trigger */}
          {photos.length === 0 ? (
            <div className="ma-proof-empty-frame">
              <div className="ma-proof-big-frame-icon">
                <Camera size={44} strokeWidth={1.8} />
              </div>
              <h4>Capture Geotagged Proof</h4>
              <p>
                Take live photos during the event. Location, time &amp; Maatram seal are stamped automatically.
              </p>

              <div className="ma-proof-frame-actions">
                <button
                  type="button"
                  className="ma-proof-btn-primary"
                  onClick={() => setCameraOpen(true)}
                >
                  <Camera size={18} />
                  <span>Open Geotag Camera</span>
                </button>

                <button
                  type="button"
                  className="ma-proof-btn-secondary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadCloud size={18} />
                  <span>Upload from Device</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileSelected}
                />
              </div>

              <div className="ma-proof-gps-badge">
                <ShieldCheck size={14} color="#16A34A" />
                <span>GPS Location Active · {deviceLocation.locationName}</span>
              </div>
            </div>
          ) : (
            <div className="ma-proof-gallery-section">
              <div className="ma-proof-gallery-header">
                <div>
                  <h4>Attached Proofs ({photos.length})</h4>
                  <p>All photos verified with live GPS watermark</p>
                </div>
                <button
                  type="button"
                  className="ma-proof-add-more-btn"
                  onClick={() => setCameraOpen(true)}
                >
                  <Plus size={16} />
                  <span>Add More</span>
                </button>
              </div>

              {/* Photos Grid */}
              <div className="ma-proof-grid">
                {photos.map((photo, i) => (
                  <div key={photo.id} className="ma-proof-item-card">
                    <div className="ma-proof-img-wrap">
                      <img src={photo.dataUrl} alt={`Proof ${i + 1}`} />
                      <span className="ma-proof-stamp-badge">
                        <MapPin size={10} /> Geotagged
                      </span>
                      <button
                        type="button"
                        className="ma-proof-delete-btn"
                        onClick={() => handleRemovePhoto(photo.id)}
                        aria-label="Remove photo"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="ma-proof-item-meta">
                      <b>Photo #{i + 1}</b>
                      <small>{photo.timestamp} · {photo.locationName}</small>
                    </div>
                  </div>
                ))}

                {/* Add Photo Card */}
                <button
                  type="button"
                  className="ma-proof-add-card"
                  onClick={() => setCameraOpen(true)}
                >
                  <Camera size={24} />
                  <span>Take Another Photo</span>
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileSelected}
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <footer className="ma-proof-flow-footer">
          <button
            type="button"
            className="ma-proof-submit-btn"
            disabled={photos.length === 0}
            onClick={() => setWarningOpen(true)}
          >
            <CheckCircle2 size={18} />
            <span>Submit Proof ({photos.length} Photo{photos.length !== 1 ? "s" : ""})</span>
          </button>
          <small className="ma-proof-footer-note">
            Your proofs will be reviewed by coordinator Aravind K before impact hours are credited.
          </small>
        </footer>
      </div>

      {/* 3. Live Geotag Camera View */}
      {cameraOpen && (
        <LiveGeotagCameraModal
          onCapture={handleAddPhoto}
          onClose={() => setCameraOpen(false)}
        />
      )}

      {/* 4. Warning Confirmation Dialog */}
      {warningOpen && (
        <div className="ma-warning-overlay" role="alertdialog">
          <div className="ma-warning-card">
            <div className="ma-warning-icon-wrap">
              <AlertTriangle size={36} color="#D97706" />
            </div>
            <h3>Confirm Proof Submission</h3>
            <p>
              Are you sure you want to submit <strong>{photos.length} geotagged photo{photos.length !== 1 ? "s" : ""}</strong> for the Sangamam Event?
            </p>
            <div className="ma-warning-summary">
              <div>
                <MapPin size={14} color="#D97706" />
                <span>Semmozhi Poonga, Chennai (13.0489° N)</span>
              </div>
              <div>
                <ShieldCheck size={14} color="#16A34A" />
                <span>Geotag &amp; Maatram Seal Verified</span>
              </div>
              <div>
                <Clock size={14} color="#2563EB" />
                <span>Target: 12 Hours Credit</span>
              </div>
            </div>
            <div className="ma-warning-actions">
              <button
                type="button"
                className="ma-warning-cancel-btn"
                onClick={() => setWarningOpen(false)}
              >
                Review Photos
              </button>
              <button
                type="button"
                className="ma-warning-confirm-btn"
                onClick={handleConfirmSubmit}
              >
                Yes, Confirm &amp; Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Congratulations Dialog */}
      {congratsOpen && (
        <div className="ma-congrats-overlay" role="dialog">
          <div className="ma-congrats-card">
            <div className="ma-congrats-celebration">
              <img
                src="/assets/illustrations/success-checkmark.png"
                alt="Success"
                className="ma-congrats-icon"
              />
              <span className="ma-congrats-stars">✨ 🌟 🎉</span>
            </div>

            <h3>Congratulations! Proof Submitted 🎉</h3>
            <p className="ma-congrats-msg">
              Your <strong>{photos.length} event proof photo{photos.length !== 1 ? "s" : ""}</strong> have been successfully submitted and are now <strong>under review</strong> by the community coordinator.
            </p>

            <div className="ma-congrats-status-box">
              <div className="ma-congrats-status-row">
                <span>Status:</span>
                <span className="ma-congrats-pill-review">⏳ Under Review</span>
              </div>
              <div className="ma-congrats-status-row">
                <span>Event:</span>
                <b>Palm Seeds Plantation</b>
              </div>
              <div className="ma-congrats-status-row">
                <span>Reference ID:</span>
                <code>SG-PRF-{Math.floor(1000 + Math.random() * 9000)}</code>
              </div>
              <div className="ma-congrats-status-row">
                <span>Hours to Credit:</span>
                <b style={{ color: "#D97706" }}>12h 30m</b>
              </div>
            </div>

            <button
              type="button"
              className="ma-congrats-done-btn"
              onClick={handleDone}
            >
              Done / Back to Action Centre
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------
// 2. Live Geotag Camera Component
// -----------------------------------------------------------------------
function LiveGeotagCameraModal({
  onCapture,
  onClose,
}: {
  onCapture: (photo: GeotaggedPhoto) => void;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [streamActive, setStreamActive] = useState(false);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [liveClock, setLiveClock] = useState("");
  const [flashOn, setFlashOn] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [coords, setCoords] = useState({
    lat: 13.0489,
    lng: 80.252,
    accuracy: 5.0,
    address: "Semmozhi Poonga, Cathedral Rd, Chennai, Tamil Nadu 600086",
    locationName: "Semmozhi Poonga, Chennai",
  });

  // Clock ticker for live geotagging
  useEffect(() => {
    function updateClock() {
      const now = new Date();
      setLiveClock(
        now.toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      );
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Real Camera stream initializer with desktop/mobile fallback
  const startCamera = async (mode: "environment" | "user") => {
    setCameraError(null);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Camera API not supported in this browser");
      setStreamActive(false);
      return;
    }

    try {
      // 1. Try with ideal facingMode
      const s = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      streamRef.current = s;
      setStreamActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        await videoRef.current.play().catch(() => {});
      }
    } catch {
      // 2. Fallback to basic video: true (for laptops/desktops without facingMode constraints)
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        streamRef.current = fallbackStream;
        setStreamActive(true);
        if (videoRef.current) {
          videoRef.current.srcObject = fallbackStream;
          await videoRef.current.play().catch(() => {});
        }
      } catch (err: any) {
        console.warn("Camera access denied or unavailable:", err);
        setCameraError(err?.message || "Camera access denied or unavailable");
        setStreamActive(false);
      }
    }
  };

  // Flip front/rear camera
  const toggleFacingMode = () => {
    const nextMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Real Geolocation Fetcher with reverse-geocoding
  const refreshLocation = () => {
    if (!("geolocation" in navigator)) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(5));
        const lng = Number(pos.coords.longitude.toFixed(5));
        const accuracy = Number((pos.coords.accuracy || 5).toFixed(1));

        let address = `${lat}° N, ${lng}° E`;
        let locationName = "Current Location";

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
            { headers: { "Accept-Language": "en" } },
          );
          if (res.ok) {
            const data = await res.json();
            if (data?.display_name) {
              address = data.display_name;
              const a = data.address || {};
              locationName =
                a.suburb || a.neighbourhood || a.road || a.city || a.town || a.village || "Current Location";
            }
          }
        } catch {
          // offline fallback
        }

        setCoords({
          lat,
          lng,
          accuracy,
          address,
          locationName,
        });
        setIsLocating(false);
      },
      (err) => {
        console.warn("Location error:", err);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  };

  // Lifecycle: init camera & geolocation
  useEffect(() => {
    startCamera(facingMode);
    refreshLocation();

    let watchId: number | undefined;
    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          setCoords((prev) => ({
            ...prev,
            lat: Number(pos.coords.latitude.toFixed(5)),
            lng: Number(pos.coords.longitude.toFixed(5)),
            accuracy: Number((pos.coords.accuracy || 5).toFixed(1)),
          }));
        },
        () => {},
        { enableHighAccuracy: true, maximumAge: 5000 },
      );
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (watchId !== undefined && "geolocation" in navigator) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  function handleSnap() {
    setFlashOn(true);
    setTimeout(() => setFlashOn(false), 200);

    const video = videoRef.current;
    const w = streamActive && video && video.videoWidth ? video.videoWidth : 800;
    const h = streamActive && video && video.videoHeight ? video.videoHeight : 600;

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (streamActive && video) {
      if (facingMode === "user") {
        ctx.translate(w, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, w, h);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      } else {
        ctx.drawImage(video, 0, 0, w, h);
      }
      finishCapture();
    } else {
      // Draw realistic volunteer plantation scene from assets
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        ctx.drawImage(img, 0, 0, w, h);
        finishCapture();
      };
      img.onerror = () => {
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, "#1E3A2F");
        grad.addColorStop(1, "#0D1F17");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
        finishCapture();
      };
      img.src = "/assets/admin/palm-seeds-event-image.png";
    }

    function finishCapture() {
      if (!ctx) return;
      drawGeotagStamp(
        ctx,
        w,
        h,
        "Sangamam Community · Palm Seeds Plantation",
        coords.address,
        `${coords.lat}° N, ${coords.lng}° E · ±${coords.accuracy}m`,
        liveClock,
      );

      const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
      const photo: GeotaggedPhoto = {
        id: `snap-${Date.now()}`,
        dataUrl,
        timestamp: liveClock,
        locationName: coords.locationName,
        coords: `${coords.lat}° N, ${coords.lng}° E`,
        lat: coords.lat,
        lng: coords.lng,
      };

      onCapture(photo);
    }
  }

  return (
    <div className="ma-camera-overlay" role="dialog">
      <div className="ma-camera-container">
        {/* Flash effect */}
        {flashOn && <div className="ma-camera-flash" />}

        {/* Top Controls */}
        <div className="ma-camera-top-bar">
          <button
            type="button"
            className="ma-camera-close-btn"
            onClick={onClose}
            aria-label="Close Camera"
          >
            <X size={22} />
          </button>

          <div className="ma-camera-status-pill">
            <span className="ma-camera-pulse-dot" />
            <span>GPS Live {coords.accuracy ? `· ±${coords.accuracy}m` : ""}</span>
            <button
              type="button"
              className="ma-camera-refresh-gps-btn"
              onClick={refreshLocation}
              title="Refresh GPS Location"
              aria-label="Refresh GPS Location"
            >
              <RefreshCw size={13} className={isLocating ? "ma-spin" : ""} />
            </button>
          </div>

          <div className="ma-camera-top-right">
            <button
              type="button"
              className="ma-camera-flip-btn"
              onClick={toggleFacingMode}
              title="Flip Camera (Front/Rear)"
              aria-label="Flip Camera"
            >
              <SwitchCamera size={20} />
            </button>
          </div>
        </div>

        {/* Viewfinder Area */}
        <div className="ma-camera-viewfinder">
          {/* Real device camera video feed - always kept in DOM so ref is never null */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`ma-camera-video-feed ${facingMode === "user" ? "is-mirrored" : ""}`}
            style={{
              display: streamActive ? "block" : "none",
            }}
          />

          {!streamActive && (
            <div className="ma-camera-simulated-feed">
              <img
                src="/assets/admin/palm-seeds-event-image.png"
                alt="Event Live View"
                className="ma-camera-simulated-img"
              />
              <div className="ma-camera-grid-lines" />
              <div className="ma-camera-fallback-notice">
                <Camera size={26} color="#FEC802" />
                <p>
                  {cameraError
                    ? `Camera notice: ${cameraError}`
                    : "Connecting live device camera…"}
                </p>
                <button
                  type="button"
                  className="ma-camera-retry-btn"
                  onClick={() => startCamera(facingMode)}
                >
                  <RotateCcw size={14} /> Connect Camera
                </button>
              </div>
            </div>
          )}

          {/* Viewfinder Target Reticle */}
          <div className="ma-camera-reticle">
            <div className="ma-reticle-corner tl" />
            <div className="ma-reticle-corner tr" />
            <div className="ma-reticle-corner bl" />
            <div className="ma-reticle-corner br" />
            <div className="ma-reticle-center">+</div>
          </div>

          {/* Real-time Geotag Overlay on Viewfinder */}
          <div className="ma-camera-geotag-banner">
            {/* Left mini map visual */}
            <div className="ma-geotag-mini-map">
              <svg viewBox="0 0 80 80" width="64" height="64" className="ma-map-svg">
                <rect width="80" height="80" fill="#E2E8F0" rx="8" />
                {/* Park green zone */}
                <path d="M10,20 Q40,5 70,30 T60,75 L15,70 Z" fill="#BBF7D0" />
                {/* Road lines */}
                <path d="M0,45 L80,35" stroke="#94A3B8" strokeWidth="4" />
                <path d="M40,0 L35,80" stroke="#94A3B8" strokeWidth="4" />
                {/* Pin with ripple */}
                <circle cx="40" cy="40" r="14" fill="rgba(239, 68, 68, 0.2)" />
                <circle cx="40" cy="40" r="6" fill="#EF4444" />
                <circle cx="40" cy="40" r="2" fill="#FFFFFF" />
              </svg>
              <span className="ma-map-pin-label">MAP VIEW</span>
            </div>

            {/* Middle Details with Maatram Logo */}
            <div className="ma-geotag-info">
              <div className="ma-geotag-brand-row">
                <img
                  src="/assets/brand/maatram-foundation-logo.png"
                  alt="Maatram Foundation"
                  className="ma-geotag-logo"
                />
                <div className="ma-geotag-brand-text">
                  <b>MAATRAM FOUNDATION</b>
                  <span>OFFICIAL EVENT GEOTAG</span>
                </div>
              </div>

              <div className="ma-geotag-event-line">
                Sangamam Community · Palm Seeds Plantation
              </div>
              <div className="ma-geotag-address-line" title={coords.address}>
                {coords.address}
              </div>
              <div className="ma-geotag-meta-row">
                <span>📍 {coords.lat}° N, {coords.lng}° E</span>
                <span>⏱ {liveClock}</span>
                {coords.accuracy && <span className="ma-geotag-acc-pill">±{coords.accuracy}m</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Shutter Controls */}
        <div className="ma-camera-bottom-bar">
          <div className="ma-camera-hint">
            Tap button below to capture with verified GPS watermark
          </div>
          <button
            type="button"
            className="ma-camera-shutter-btn"
            onClick={handleSnap}
            aria-label="Capture Photo"
          >
            <div className="ma-shutter-inner" />
          </button>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------
// 3. Helper to draw Geotag Stamp on Canvas
// -----------------------------------------------------------------------
function drawGeotagStamp(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  eventName: string,
  address: string,
  coordsText: string,
  timeString: string,
) {
  const bannerH = Math.max(140, Math.round(h * 0.22));
  const bannerY = h - bannerH;

  // Dark translucent background with golden top accent
  ctx.fillStyle = "rgba(12, 13, 16, 0.90)";
  ctx.fillRect(0, bannerY, w, bannerH);

  ctx.fillStyle = "#FEC802";
  ctx.fillRect(0, bannerY, w, 4);

  // Mini Map Box on Left
  const mapW = 96;
  const mapH = bannerH - 32;
  ctx.fillStyle = "#E2E8F0";
  roundRect(ctx, 16, bannerY + 16, mapW, mapH, 8);
  ctx.fill();

  // Green park zone on mini map
  ctx.fillStyle = "#86EFAC";
  ctx.beginPath();
  ctx.arc(16 + mapW / 2, bannerY + 16 + mapH / 2, mapH * 0.38, 0, Math.PI * 2);
  ctx.fill();

  // Map roads
  ctx.strokeStyle = "#94A3B8";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(16, bannerY + 16 + mapH * 0.55);
  ctx.lineTo(16 + mapW, bannerY + 16 + mapH * 0.45);
  ctx.moveTo(16 + mapW * 0.5, bannerY + 16);
  ctx.lineTo(16 + mapW * 0.5, bannerY + 16 + mapH);
  ctx.stroke();

  // Map marker pin with ripple
  const pinX = 16 + mapW * 0.5;
  const pinY = bannerY + 16 + mapH * 0.5;
  ctx.fillStyle = "rgba(239, 68, 68, 0.25)";
  ctx.beginPath();
  ctx.arc(pinX, pinY, 14, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#EF4444";
  ctx.beginPath();
  ctx.arc(pinX, pinY, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.arc(pinX, pinY, 2, 0, Math.PI * 2);
  ctx.fill();

  // Text details on Right
  const startX = 16 + mapW + 16;
  const maxTextW = w - startX - 20;

  // Helper to truncate text to fit canvas width
  function truncate(text: string, max: number) {
    if (ctx.measureText(text).width <= max) return text;
    let s = text;
    while (s.length > 0 && ctx.measureText(s + "...").width > max) {
      s = s.slice(0, -1);
    }
    return s + "...";
  }

  // Brand Header with Golden Star
  ctx.fillStyle = "#FEC802";
  ctx.font = "bold 16px sans-serif";
  ctx.fillText("★ MAATRAM FOUNDATION · GPS VERIFIED PROOF", startX, bannerY + 30);

  // Event Name
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 15px sans-serif";
  ctx.fillText(truncate(eventName, maxTextW), startX, bannerY + 54);

  // Address
  ctx.fillStyle = "#E5E7EB";
  ctx.font = "13px sans-serif";
  ctx.fillText(truncate(address, maxTextW), startX, bannerY + 76);

  // Coordinates & Time
  ctx.fillStyle = "#FDE68A";
  ctx.font = "bold 13px monospace";
  ctx.fillText(`📍 ${truncate(coordsText, maxTextW)}`, startX, bannerY + 98);

  ctx.fillStyle = "#93C5FD";
  ctx.font = "12px sans-serif";
  ctx.fillText(`⏱ ${timeString}`, startX, bannerY + 118);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// -----------------------------------------------------------------------
// 4. Submit Feedback Modal
// -----------------------------------------------------------------------
export function FeedbackModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (feedback: string) => void;
}) {
  const [rating, setRating] = useState(5);
  const [tags, setTags] = useState<string[]>(["Great Organization", "Helpful Mentors"]);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const availableTags = [
    "Great Organization",
    "Helpful Mentors",
    "Loved Palm Planting",
    "Well Coordinated",
    "Inspiring Team",
    "Timely Guidance",
  ];

  function toggleTag(t: string) {
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  function handleSend() {
    setSubmitted(true);
    setTimeout(() => {
      onSubmit(comment);
      setSubmitted(false);
      onClose();
    }, 1500);
  }

  return (
    <div className="ma-feedback-modal-overlay" role="dialog">
      <div className="ma-feedback-modal-card">
        <header className="ma-feedback-modal-header">
          <h3>Submit Event Feedback</h3>
          <button type="button" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </header>

        {submitted ? (
          <div className="ma-feedback-success-state">
            <CheckCircle2 size={48} color="#16A34A" />
            <h4>Thank You For Your Feedback! 🎉</h4>
            <p>Your input helps us improve future volunteer community events.</p>
          </div>
        ) : (
          <div className="ma-feedback-modal-body">
            <p className="ma-feedback-intro">
              How was your experience participating in the <strong>Palm Seeds Plantation</strong> event?
            </p>

            {/* Star Rating */}
            <div className="ma-feedback-stars-row">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`ma-feedback-star-btn ${s <= rating ? "is-active" : ""}`}
                  onClick={() => setRating(s)}
                  aria-label={`${s} star`}
                >
                  <Star size={28} fill={s <= rating ? "#FEC802" : "none"} stroke="#FEC802" />
                </button>
              ))}
            </div>

            {/* Quick Tags */}
            <div className="ma-feedback-tags-wrap">
              {availableTags.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`ma-feedback-tag ${tags.includes(t) ? "is-selected" : ""}`}
                  onClick={() => toggleTag(t)}
                >
                  {tags.includes(t) && <Check size={12} />}
                  <span>{t}</span>
                </button>
              ))}
            </div>

            {/* Thoughts / Comments */}
            <label className="ma-feedback-label">
              <span>Your Comments &amp; Suggestions:</span>
              <textarea
                rows={3}
                placeholder="Share any special moments, suggestions for the coordinator, or ideas for the next drive…"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </label>

            <button
              type="button"
              className="ma-feedback-submit-btn"
              onClick={handleSend}
            >
              <Send size={16} />
              <span>Submit Feedback</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------
// 5. Submit Issue Report Modal
// -----------------------------------------------------------------------
export function ReportIssueModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (report: { category: string; description: string; priority: string; id: string }) => void;
}) {
  const [category, setCategory] = useState("Tools & Equipment");
  const [priority, setPriority] = useState<"Normal" | "Urgent">("Normal");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState("");

  const categories = [
    { id: "Tools & Equipment", label: "Tools & Equipment", icon: "🛠️" },
    { id: "GPS / Location", label: "GPS / Attendance", icon: "📍" },
    { id: "Transportation", label: "Transportation", icon: "🚌" },
    { id: "First Aid & Health", label: "First Aid & Health", icon: "🩹" },
    { id: "Other Issue", label: "Other Issue", icon: "💬" },
  ];

  if (!open) return null;

  function handleSubmit() {
    if (!description.trim()) return;
    const newId = `SG-REP-${Math.floor(1000 + Math.random() * 9000)}`;
    setReportId(newId);
    setSubmitted(true);
    onSubmit({
      category,
      description: description.trim(),
      priority,
      id: newId,
    });
  }

  function handleFinish() {
    setSubmitted(false);
    setDescription("");
    onClose();
  }

  return (
    <div className="ma-feedback-modal-overlay" role="dialog" aria-modal="true">
      <div className="ma-feedback-modal-card ma-report-modal-card">
        <header className="ma-feedback-modal-header ma-report-modal-header">
          <div className="ma-report-header-title">
            <div className="ma-report-header-icon">
              <AlertTriangle size={20} strokeWidth={2.4} />
            </div>
            <div>
              <h3>Submit an Issue Report</h3>
              <p>Alert lead coordinator &amp; event admin</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </header>

        {submitted ? (
          <div className="ma-feedback-success-state ma-report-success-state">
            <div className="ma-report-success-badge">
              <CheckCircle2 size={48} color="#16A34A" />
            </div>
            <h4>Report Submitted Successfully 🎉</h4>
            <p className="ma-report-success-msg">
              Your issue report has been logged and assigned directly to the Event Coordinator for immediate review.
            </p>

            <div className="ma-report-summary-box">
              <div className="ma-report-summary-row">
                <span>Reference ID:</span>
                <code>{reportId}</code>
              </div>
              <div className="ma-report-summary-row">
                <span>Category:</span>
                <b>{category}</b>
              </div>
              <div className="ma-report-summary-row">
                <span>Urgency:</span>
                <span className={`ma-report-priority-tag is-${priority.toLowerCase()}`}>{priority} Priority</span>
              </div>
              <div className="ma-report-summary-row">
                <span>Status:</span>
                <span className="ma-report-status-review">⏳ Under Review · Coordinator Alerted</span>
              </div>
            </div>

            <button
              type="button"
              className="ma-feedback-submit-btn"
              onClick={handleFinish}
            >
              Done / Return to Action Centre
            </button>
          </div>
        ) : (
          <div className="ma-feedback-modal-body">
            {/* Category Select */}
            <div className="ma-report-section">
              <label className="ma-report-label-title">Select Issue Category:</label>
              <div className="ma-report-categories-grid">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`ma-report-cat-btn ${category === cat.id ? "is-selected" : ""}`}
                    onClick={() => setCategory(cat.id)}
                  >
                    <span className="ma-report-cat-icon">{cat.icon}</span>
                    <span className="ma-report-cat-label">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Urgency Selector */}
            <div className="ma-report-section">
              <label className="ma-report-label-title">Urgency Level:</label>
              <div className="ma-report-priority-row">
                <button
                  type="button"
                  className={`ma-report-priority-btn ${priority === "Normal" ? "is-selected" : ""}`}
                  onClick={() => setPriority("Normal")}
                >
                  <Clock size={15} />
                  <span>Normal Priority</span>
                </button>
                <button
                  type="button"
                  className={`ma-report-priority-btn urgent ${priority === "Urgent" ? "is-selected" : ""}`}
                  onClick={() => setPriority("Urgent")}
                >
                  <AlertTriangle size={15} />
                  <span>Urgent / Immediate Help</span>
                </button>
              </div>
            </div>

            {/* Description Textarea */}
            <div className="ma-report-section">
              <label className="ma-report-label-title">Describe the Issue or Shortage:</label>
              <textarea
                className="ma-report-textarea"
                rows={3}
                placeholder="Explain what happened or what assistance you need (e.g. Broken shovels at row 3, or cannot mark GPS attendance)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="ma-feedback-submit-btn ma-report-submit-btn"
              disabled={!description.trim()}
              onClick={handleSubmit}
            >
              <Send size={16} />
              <span>Submit Report to Coordinator</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
