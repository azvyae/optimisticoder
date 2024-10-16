interface StoryTitleProps {
  title: string;
  subtitle: string;
}

function StoryTitle({ title, subtitle }: StoryTitleProps) {
  return (
    <section className="grid gap-2 dark:brightness-125">
      <h1 className="text-2xl sm:text-3xl break-words font-bold">{title}</h1>
      <p
        data-item="subtitle"
        className="text-sm sm:text-base text-primary break-words"
      >
        {subtitle}
      </p>
    </section>
  );
}

export { StoryTitle };
