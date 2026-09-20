const AuthBrandPanel = () => {
  return (
    <div className="flex max-w-sm flex-col items-center gap-8 text-center text-white">
      <img
        src="/illustration.png"
        alt=""
        className="w-full max-w-80 drop-shadow-[0_20px_40px_rgba(30,27,75,0.25)]"
      />
      <div className="flex flex-col gap-2">
        <p className="text-xl leading-snug font-semibold">
          One digital classroom.
          <br />
          Everything connected.
        </p>
        <p className="text-sm text-white/80">
          Courses, lessons, resources, chat and live classes — all in one
          place for teachers and students.
        </p>
      </div>
    </div>
  );
};

export default AuthBrandPanel;
