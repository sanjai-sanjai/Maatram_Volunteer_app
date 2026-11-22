import React, { useEffect, useRef, useState } from "react";
import {
  Camera,
  Check,
  ChevronRight,
  Clock,
  FlipHorizontal,
  MapPin,
  Mic,
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  Send,
  Square,
  SwitchCamera,
  Trash2,
  X,
} from "lucide-react";

// ---------------------------------------------------------------------------
// 1. Live Device Camera Modal (Used across Student & Admin Chat)
// ---------------------------------------------------------------------------
export interface LiveCameraModalProps {
  open: boolean;
  onClose: () => void;
  onCapture: (dataUrl: string, caption?: string) => void;
  title?: string;
  withGeotag?: boolean;
  eventDetails?: {
    communityName: string;
    eventName: string;
    address: string;
    coordsText?: string;
    lat?: number;
    lng?: number;
  };
}

export function LiveDeviceCameraModal({
  open,
  onClose,
  onCapture,
  title = "Device Camera",
  withGeotag = false,
  eventDetails,
}: LiveCameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [streamActive, setStreamActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [liveTime, setLiveTime] = useState("");

  // Clock ticker
  useEffect(() => {
    function tick() {
      const now = new Date();
      setLiveTime(
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
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const startCamera = async (mode: "environment" | "user") => {
    setCameraError(null);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Camera API not supported in this browser");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
        setStreamActive(true);
      }
    } catch {
      // Fallback without constraints for desktop webcams
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        streamRef.current = fallbackStream;
        if (videoRef.current) {
          videoRef.current.srcObject = fallbackStream;
          await videoRef.current.play().catch(() => {});
          setStreamActive(true);
        }
      } catch (err: any) {
        console.warn("Live camera unavailable:", err);
        setCameraError(err?.message || "Camera access denied or unavailable");
        setStreamActive(false);
      }
    }
  };

  useEffect(() => {
    if (!open) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      return;
    }

    setCapturedPhoto(null);
    setCaption("");
    // Small timeout to guarantee video element is mounted in DOM
    const timer = setTimeout(() => {
      startCamera(facingMode);
    }, 50);
    return () => {
      clearTimeout(timer);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [open, facingMode]);

  const toggleFacingMode = () => {
    const next = facingMode === "environment" ? "user" : "environment";
    setFacingMode(next);
  };

  const handleSnap = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 200);

    const video = videoRef.current;
    const w = video && video.videoWidth ? video.videoWidth : 800;
    const h = video && video.videoHeight ? video.videoHeight : 600;

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
    } else {
      // Mock realistic shot if camera was blocked
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "#1F2937");
      grad.addColorStop(1, "#111827");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }

    // Optional Geotag Watermark
    if (withGeotag && eventDetails) {
      const bannerH = Math.max(130, Math.round(h * 0.22));
      const bannerY = h - bannerH;

      ctx.fillStyle = "rgba(10, 12, 16, 0.90)";
      ctx.fillRect(0, bannerY, w, bannerH);

      ctx.fillStyle = "#FEC802";
      ctx.fillRect(0, bannerY, w, 4);

      // Mini map
      const mapW = 90;
      const mapH = bannerH - 28;
      ctx.fillStyle = "#E2E8F0";
      ctx.fillRect(14, bannerY + 14, mapW, mapH);
      ctx.fillStyle = "#86EFAC";
      ctx.beginPath();
      ctx.arc(14 + mapW / 2, bannerY + 14 + mapH / 2, mapH * 0.35, 0, Math.PI * 2);
      ctx.fill();

      // Pin
      ctx.fillStyle = "#EF4444";
      ctx.beginPath();
      ctx.arc(14 + mapW / 2, bannerY + 14 + mapH / 2, 5, 0, Math.PI * 2);
      ctx.fill();

      // Details
      const startX = 14 + mapW + 16;
      ctx.fillStyle = "#FEC802";
      ctx.font = "bold 15px sans-serif";
      ctx.fillText("★ MAATRAM FOUNDATION · OFFICIAL GEOTAG", startX, bannerY + 28);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText(`${eventDetails.communityName} · ${eventDetails.eventName}`, startX, bannerY + 50);

      ctx.fillStyle = "#D1D5DB";
      ctx.font = "12px sans-serif";
      ctx.fillText(eventDetails.address, startX, bannerY + 70);

      ctx.fillStyle = "#FDE68A";
      ctx.font = "bold 12px monospace";
      ctx.fillText(
        eventDetails.coordsText || `📍 ${eventDetails.lat || 13.0067}° N, ${eventDetails.lng || 80.0033}° E · ±4.2m`,
        startX,
        bannerY + 90,
      );

      ctx.fillStyle = "#93C5FD";
      ctx.font = "11px sans-serif";
      ctx.fillText(`🕒 ${liveTime}`, startX, bannerY + 108);
    } else {
      // Subtle bottom timestamp badge for standard chat photos
      ctx.fillStyle = "rgba(0,0,0,0.65)";
      ctx.fillRect(0, h - 36, w, 36);
      ctx.fillStyle = "#FEC802";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("MAATRAM COMMUNITY CAMERA", 14, h - 14);
      ctx.fillStyle = "#FFF";
      ctx.font = "12px sans-serif";
      ctx.fillText(liveTime, w - 210, h - 14);
    }

    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    setCapturedPhoto(dataUrl);
  };

  const handleSendPhoto = () => {
    if (!capturedPhoto) return;
    onCapture(capturedPhoto, caption);
    onClose();
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "#000000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Flash overlay */}
      {flash && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#FFFFFF",
            zIndex: 220,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Top Header Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          background: "linear-gradient(rgba(0,0,0,0.8), transparent)",
          zIndex: 210,
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "none",
            borderRadius: "50%",
            width: 38,
            height: 38,
            display: "grid",
            placeItems: "center",
            color: "#FFF",
            cursor: "pointer",
          }}
          aria-label="Close camera"
        >
          <X size={20} />
        </button>

        <div style={{ color: "#FFF", fontSize: 13, fontWeight: 700, textAlign: "center" }}>
          <span>{title}</span>
          <div style={{ fontSize: 10, color: "#FEC802", fontWeight: 600 }}>
            {streamActive ? "● LIVE STREAM" : "CAMERA READY"}
          </div>
        </div>

        <button
          type="button"
          onClick={toggleFacingMode}
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "none",
            borderRadius: "50%",
            width: 38,
            height: 38,
            display: "grid",
            placeItems: "center",
            color: "#FFF",
            cursor: "pointer",
          }}
          aria-label="Switch camera"
        >
          <SwitchCamera size={20} />
        </button>
      </div>

      {/* Viewfinder / Preview Center */}
      <div
        style={{
          position: "relative",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Always mounted video element */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: facingMode === "user" ? "scaleX(-1)" : "none",
            display: capturedPhoto ? "none" : "block",
          }}
        />

        {/* Fallback notice if stream is unavailable */}
        {!streamActive && !capturedPhoto && (
          <div
            style={{
              position: "relative",
              zIndex: 10,
              background: "rgba(17, 24, 39, 0.85)",
              padding: "20px 24px",
              borderRadius: 16,
              textAlign: "center",
              color: "#FFF",
              maxWidth: 320,
              margin: "0 20px",
              border: "1px solid #374151",
            }}
          >
            <Camera size={40} color="#FEC802" style={{ margin: "0 auto 10px" }} />
            <div style={{ fontWeight: 700, fontSize: 14 }}>Connecting Camera…</div>
            <p style={{ fontSize: 12, color: "#9CA3AF", margin: "6px 0 12px" }}>
              {cameraError || "Please allow camera access when prompted by your browser."}
            </p>
            <button
              type="button"
              onClick={() => startCamera(facingMode)}
              style={{
                background: "#FEC802",
                color: "#111827",
                border: "none",
                borderRadius: 9999,
                padding: "8px 18px",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Retry Camera Connection
            </button>
          </div>
        )}

        {/* Viewfinder Reticle Grid */}
        {!capturedPhoto && streamActive && (
          <div
            style={{
              position: "absolute",
              inset: "15% 10%",
              border: "1px dashed rgba(254, 200, 2, 0.4)",
              borderRadius: 16,
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ color: "rgba(254, 200, 2, 0.6)", fontSize: 24 }}>+</div>
          </div>
        )}

        {/* Captured Photo Snapshot Preview */}
        {capturedPhoto && (
          <div style={{ position: "absolute", inset: 0, zIndex: 15, background: "#000" }}>
            <img
              src={capturedPhoto}
              alt="Captured"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        )}
      </div>

      {/* Bottom Controls Bar */}
      <div
        style={{
          padding: "20px 24px 32px",
          background: "linear-gradient(transparent, rgba(0,0,0,0.9))",
          zIndex: 210,
        }}
      >
        {capturedPhoto ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Caption input */}
            <input
              type="text"
              placeholder="Add a caption to this photo…"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 12,
                padding: "10px 14px",
                color: "#FFFFFF",
                fontSize: 13,
                outline: "none",
              }}
            />

            <div style={{ display: "flex", gap: 12 }}>
              <button
                type="button"
                onClick={() => setCapturedPhoto(null)}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  background: "rgba(255,255,255,0.2)",
                  color: "#FFF",
                  border: "none",
                  borderRadius: 12,
                  padding: "12px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                <RotateCcw size={16} /> Retake
              </button>

              <button
                type="button"
                onClick={handleSendPhoto}
                style={{
                  flex: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  background: "#FEC802",
                  color: "#111827",
                  border: "none",
                  borderRadius: 12,
                  padding: "12px",
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                <Send size={16} /> Send Photo
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
            }}
          >
            <button
              type="button"
              onClick={handleSnap}
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "#FEC802",
                border: "5px solid #FFFFFF",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(254, 200, 2, 0.6)",
                transform: "scale(1)",
                transition: "transform 0.1s ease",
              }}
              aria-label="Capture photo"
            >
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: "50%",
                  background: "#FFFFFF",
                }}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2. Real-time Audio Voice Recording Hook
// ---------------------------------------------------------------------------
export function useRealtimeVoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      setSeconds(0);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setHasPermission(true);

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.start(100);
      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } catch (err) {
      console.warn("Microphone access denied or unsupported, using simulated recorder:", err);
      setHasPermission(false);
      setIsRecording(true);
      timerRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
  };

  const stopRecording = (): Promise<{ audioUrl?: string; durationStr: string; totalSeconds: number }> => {
    return new Promise((resolve) => {
      clearInterval(timerRef.current);
      const totalSec = seconds;
      const mins = Math.floor(totalSec / 60);
      const secs = totalSec % 60;
      const durationStr = `${mins}:${secs < 10 ? "0" : ""}${secs}`;

      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: mediaRecorderRef.current?.mimeType || "audio/webm",
          });
          const audioUrl = URL.createObjectURL(audioBlob);

          if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop());
            streamRef.current = null;
          }

          setIsRecording(false);
          setSeconds(0);
          resolve({ audioUrl, durationStr: durationStr === "0:00" ? "0:03" : durationStr, totalSeconds: totalSec });
        };
        mediaRecorderRef.current.stop();
      } else {
        // Fallback for simulated recording
        setIsRecording(false);
        setSeconds(0);
        resolve({
          durationStr: durationStr === "0:00" ? "0:04" : durationStr,
          totalSeconds: totalSec || 4,
        });
      }
    });
  };

  const cancelRecording = () => {
    clearInterval(timerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setIsRecording(false);
    setSeconds(0);
    audioChunksRef.current = [];
  };

  return {
    isRecording,
    seconds,
    startRecording,
    stopRecording,
    cancelRecording,
  };
}

// ---------------------------------------------------------------------------
// 3. Playable Voice Note Bubble Component
// ---------------------------------------------------------------------------
export function PlayableVoiceMessage({
  audioUrl,
  duration = "0:08",
  senderName,
}: {
  audioUrl?: string | undefined;
  duration?: string | undefined;
  senderName?: string | undefined;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioUrl) {
      // Mock sound effect if no real blob url
      setIsPlaying(!isPlaying);
      setTimeout(() => setIsPlaying(false), 3000);
      return;
    }

    if (!audioRef.current) {
      const a = new Audio(audioUrl);
      a.onended = () => setIsPlaying(false);
      audioRef.current = a;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 12px",
        background: "#FFFFFF",
        borderRadius: 14,
        border: "1px solid #E5E7EB",
        minWidth: 190,
        margin: "4px 0",
      }}
    >
      <button
        type="button"
        onClick={togglePlay}
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "#FEC802",
          border: "none",
          display: "grid",
          placeItems: "center",
          cursor: "pointer",
          flexShrink: 0,
          color: "#111827",
        }}
        aria-label={isPlaying ? "Pause voice message" : "Play voice message"}
      >
        {isPlaying ? <Pause size={18} fill="#111827" /> : <Play size={18} fill="#111827" style={{ marginLeft: 2 }} />}
      </button>

      {/* Animated Sound Wave Bars */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 3, height: 24 }}>
        {[14, 22, 10, 18, 24, 12, 20, 16, 8, 22, 14, 18].map((h, i) => (
          <span
            key={i}
            style={{
              width: 3,
              height: isPlaying ? `${Math.max(6, (h * ((i % 3) + 1)) % 24)}px` : `${h}px`,
              background: isPlaying ? "#2563EB" : "#9CA3AF",
              borderRadius: 2,
              transition: "height 0.15s ease",
            }}
          />
        ))}
      </div>

      <span style={{ fontSize: 11, fontWeight: 700, color: "#4B5563" }}>{duration}</span>
    </div>
  );
}
