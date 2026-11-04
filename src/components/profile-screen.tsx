import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Bell, BellDot, BellRing, BookOpen, CalendarDays, ChartNoAxesColumnIncreasing, CheckCircle2, ChevronRight, Clock3, FileBadge2, GraduationCap, HeartHandshake, Info, LogOut, MapPin, Menu, Pencil, ShieldCheck, Trophy, User, Users, X } from 'lucide-react';
import { Action, Modal, Page } from '@/components/additional-shared';
import { mockDashboard, mockNotifications, mockStudent } from '@/data/mock';
import handHeartIcon from '@/assets/profile/hand-heart-icon.png.asset.json';
import calendarMegaphone from '@/assets/profile/calendar-megaphone.png.asset.json';
import goldenBadge from '@/assets/profile/golden-checkmark-badge.png.asset.json';
import impactBanner from '@/assets/profile/making-a-real-difference.png.asset.json';
import palmTeam from '@/assets/additional/palm-team.jpg.asset.json';
import school from '@/assets/additional/school.jpg.asset.json';
import verificationTeam from '@/assets/additional/verification-team.jpg.asset.json';

const stats = [
  { Icon: CalendarDays, value: mockDashboard.opportunities, label: 'Events Participated' },
  { Icon: Clock3, value: mockDashboard.volunteerHours, label: 'Volunteer Hours' },
  { Icon: HeartHandshake, value: mockDashboard.contributed, label: 'Volunteering Contributed' },
  { Icon: ChartNoAxesColumnIncreasing, value: mockDashboard.impactPoints, label: 'Impact Points' },
];

const recentActivity = [
  { name: 'Palm Seeds Plantation', date: 'Nov 02, 2026', hours: '3 hrs', photo: palmTeam.url },
  { name: 'School Visit – Govt. Middle School', date: 'Oct 14, 2026', hours: '5 hrs', photo: school.url },
  { name: 'Physical Verification – Admissions', date: 'Oct 28, 2026', hours: '8 hrs', photo: verificationTeam.url },
];

const achievements = [
  { name: '10 Hours Club', detail: 'Completed your first 10 volunteer hours.' },
  { name: 'Eco Warrior', detail: 'Recognized for a greener environment.' },
  { name: 'Education Supporter', detail: 'Supported students and their education.' },
];

const certificates = [
  { name: 'Palm Seeds Plantation', detail: 'Volunteer participation · Nov 02, Chennai' },
  { name: 'Physical Verification', detail: 'Community service · Oct 28, Coimbatore' },
];

const confettiColors = ['#FEC802', '#FFD000', '#20B83A', '#FF8A00', '#2B4EBC', '#E53935'];
const confettiPieces = Array.from({ length: 30 }, (_, i) => {
  const angle = (i / 30) * Math.PI * 2;
  const dist = 95 + (i % 5) * 30;
  return {
    id: i,
    tx: Math.cos(angle) * dist,
    ty: Math.sin(angle) * dist - 26,
    rot: (i * 47) % 360,
    delay: (i % 7) * 0.035,
    color: confettiColors[i % confettiColors.length],
    w: 6 + (i % 3) * 3,
    h: 10 + (i % 4) * 3,
  };
});

type ProfileDialog = 'menu' | 'notifications' | 'edit' | 'privacy' | 'about' | null;

export function ProfileScreen() {
  const navigate = useNavigate();
  const [available, setAvailable] = useState(true);
  const [celebrate, setCelebrate] = useState(false);
  const [tab, setTab] = useState<'activity' | 'achievements' | 'certificates'>('activity');
  const [dialog, setDialog] = useState<ProfileDialog>(null);

  const toggleAvailable = () => setAvailable(value => {
    if (!value) setCelebrate(true);
    return !value;
  });

  const accountRows = [
    { Icon: User, label: 'Personal Information', sub: 'View and manage your details', action: () => setDialog('edit') },
    { Icon: Bell, label: 'Notification Preferences', sub: 'Choose what updates you want to receive', action: () => setDialog('notifications') },
    { Icon: ShieldCheck, label: 'Privacy & Security', sub: 'Manage your account and data', action: () => setDialog('privacy') },
    { Icon: Info, label: 'About Maatram', sub: 'Know more about our mission and work', action: () => setDialog('about') },
  ];

  return <Page active="Profile" className="ma-profile">
    <header className="ma-profile-header">
      <Action className="ma-icon" aria-label="Open menu" onClick={() => setDialog('menu')}><Menu /></Action>
      <img className="ma-profile-logo" src="/assets/brand/maatram-foundation-logo.png" alt="Maatram Foundation" />
      <Action className="ma-icon ma-profile-bell" aria-label="Notifications" onClick={() => setDialog('notifications')}><Bell /><span className="ma-profile-bell-dot" /></Action>
    </header>

    <section className="ma-profile-identity" aria-label="Volunteer identity">
      <img className="ma-profile-avatar" src="/assets/dashboard/student-avatar-clean.jpg" alt={`Portrait of ${mockStudent.firstName}`} />
      <div className="ma-profile-identity-main">
        <h2>{mockStudent.firstName} R</h2>
        <p className="ma-profile-role">{mockStudent.category} · <b>{mockStudent.maatramId}</b></p>
        <p><GraduationCap />{mockStudent.college}</p>
        <div className="ma-profile-location-row">
          <p><MapPin />{mockStudent.collegeLocation}</p>
          <span className="ma-profile-verified"><CheckCircle2 />Verified Volunteer</span>
        </div>
      </div>
      <button type="button" className="ma-profile-edit" onClick={() => setDialog('edit')}><Pencil />Edit Profile</button>
    </section>

    <section className="ma-profile-availability" aria-label="Volunteer availability">
      <div className="ma-profile-availability-top">
        <img className="ma-profile-availability-heart" src={handHeartIcon.url} alt="" />
        <div>
          <h2>Volunteer Availability</h2>
          <p>Let Maatram know when you're ready to contribute.</p>
        </div>
        <img className="ma-profile-availability-calendar" src={calendarMegaphone.url} alt="" />
      </div>
      <div className="ma-profile-availability-toggle">
        <h3>I'm Available to Volunteer</h3>
        <button type="button" role="switch" aria-checked={available} aria-label="Available to volunteer" className={available ? 'ma-profile-switch ma-profile-switch--on' : 'ma-profile-switch'} onClick={toggleAvailable}>
          <span />
        </button>
      </div>
      <p className="ma-profile-availability-note"><Info />When enabled, you'll be considered for relevant volunteering opportunities and receive event notifications.</p>
    </section>

    <h2 className="ma-profile-section-title">My Volunteer Stats</h2>
    <section className="ma-profile-stats" aria-label="Volunteer statistics">
      {stats.map(({ Icon, value, label }) => <div key={label}><Icon /><strong>{value}</strong><span>{label}</span></div>)}
    </section>

    <h2 className="ma-profile-section-title">My Impact at Maatram</h2>
    <img className="ma-profile-impact-banner" src={impactBanner.url} alt="Making a Real Difference! Students supported, awareness created and green initiatives at Maatram" />

    <div className="ma-profile-tabs" role="tablist" aria-label="Activity sections">
      {([['activity', CalendarDays, 'My Activity'], ['achievements', Trophy, 'Achievements'], ['certificates', FileBadge2, 'Certificates']] as const).map(([key, Icon, label]) =>
        <button key={key} role="tab" aria-selected={tab === key} className={tab === key ? 'ma-profile-tab ma-profile-tab--active' : 'ma-profile-tab'} onClick={() => setTab(key)}><Icon />{label}</button>)}
    </div>

    {tab === 'activity' && <>
      <div className="ma-profile-recent-head">
        <h2 className="ma-profile-section-title">Recent Volunteering</h2>
        <button type="button" className="ma-profile-viewall" onClick={() => navigate({ to: '/impact' })}>View All →</button>
      </div>
      <section className="ma-profile-recent" aria-label="Recent volunteering">
        {recentActivity.map(item => <article key={item.name} className="ma-profile-activity-card">
          <img src={item.photo} alt="" />
          <div>
            <h3>{item.name}</h3>
            <p><CalendarDays />{item.date}<i>|</i><Clock3 />{item.hours}</p>
          </div>
          <span className="ma-profile-completed"><CheckCircle2 />Completed</span>
        </article>)}
      </section>
    </>}
    {tab === 'achievements' && <section className="ma-profile-recent" aria-label="Achievements">
      {achievements.map(item => <div key={item.name} className="ma-profile-row"><Trophy /><div><h3>{item.name}</h3><p>{item.detail}</p></div><ChevronRight /></div>)}
    </section>}
    {tab === 'certificates' && <section className="ma-profile-recent" aria-label="Certificates">
      {certificates.map(item => <div key={item.name} className="ma-profile-row"><FileBadge2 /><div><h3>{item.name}</h3><p>{item.detail}</p></div><ChevronRight /></div>)}
    </section>}

    <h2 className="ma-profile-section-title">Account &amp; Preferences</h2>
    <section className="ma-profile-account" aria-label="Account and preferences">
      {accountRows.map(({ Icon, label, sub, action }) => <button key={label} className="ma-profile-account-row" onClick={action}><Icon /><div><h3>{label}</h3><p>{sub}</p></div><ChevronRight /></button>)}
      <button className="ma-profile-account-row ma-profile-account-row--danger" onClick={() => navigate({ to: '/welcome' })}><LogOut /><div><h3>Logout</h3></div></button>
    </section>

    <Modal open={dialog !== null} onClose={() => setDialog(null)} title={dialog === 'menu' ? 'Menu' : dialog === 'notifications' ? 'Notifications' : dialog === 'privacy' ? 'Privacy & Security' : dialog === 'about' ? 'About Maatram' : 'Edit Profile'}>
      <div className="ma-profile-dialog">
        {dialog === 'menu' && <><h2>Menu</h2><p>Quick links</p><nav className="ma-profile-menu">
          <button onClick={() => { setDialog(null); navigate({ to: '/dashboard' }); }}>Home</button>
          <button onClick={() => { setDialog(null); navigate({ to: '/explore' }); }}>Explore Opportunities</button>
          <button onClick={() => { setDialog(null); navigate({ to: '/community' }); }}>My Communities</button>
          <button onClick={() => { setDialog(null); navigate({ to: '/impact' }); }}>Impact Arena</button>
          <button onClick={() => { setDialog(null); navigate({ to: '/fund-request' }); }}>Fund Request</button>
        </nav></>}
        {dialog === 'notifications' && <><h2>Notifications</h2>{mockNotifications.map(note => <p key={note} className="ma-profile-note"><BellDot />{note}</p>)}</>}
        {dialog === 'edit' && <><h2>Edit Profile</h2><p>Profile editing is managed by the Maatram team. Contact your coordinator to update your name, photo or college details.</p></>}
        {dialog === 'privacy' && <><h2>Privacy & Security</h2><p>Your name and photo are visible only to event coordinators. On the Impact leaderboard you appear as an anonymous volunteer number.</p></>}
        {dialog === 'about' && <><h2>About Maatram</h2><p>Maatram Foundation connects student volunteers with schools and communities — guiding students, creating opportunities and building a brighter future.</p></>}
      </div>
    </Modal>

    {celebrate && <div className="ma-celebrate" role="dialog" aria-modal="true" aria-label="Availability enabled">
      <div className="ma-celebrate-card">
        <button type="button" className="ma-celebrate-close" aria-label="Close" onClick={() => setCelebrate(false)}><X /></button>
        <div className="ma-celebrate-badge">
          <img src={goldenBadge.url} alt="" />
          {confettiPieces.map(p => <span key={p.id} className="ma-celebrate-confetti" style={{
            width: p.w, height: p.h, background: p.color,
            '--tx': `${p.tx}px`, '--ty': `${p.ty}px`, '--rot': `${p.rot}deg`, '--delay': `${p.delay}s`,
          } as React.CSSProperties} />)}
        </div>
        <h2>You're Now Available<br />for Volunteering!</h2>
        <span className="ma-celebrate-swoosh" aria-hidden="true" />
        <p>Maatram will now notify you about relevant volunteering opportunities, events, and initiatives.</p>
        <div className="ma-celebrate-features">
          <div><BellRing /><span>Get Event Alerts</span></div>
          <div><Users /><span>Be Part of Initiatives</span></div>
          <div><HeartHandshake /><span>Make a Real Impact</span></div>
        </div>
        <button type="button" className="ma-celebrate-gotit" onClick={() => setCelebrate(false)}>Got It!</button>
        <button type="button" className="ma-celebrate-prefs" onClick={() => { setCelebrate(false); setDialog('notifications'); }}><Pencil />Update Preferences</button>
        <span className="ma-celebrate-wave" aria-hidden="true" />
      </div>
    </div>}
  </Page>;
}
