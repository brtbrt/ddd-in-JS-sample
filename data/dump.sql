create table articles_counter
(
    id    integer           not null
        constraint articles_counter_pk
            primary key,
    total integer default 0 not null
);

alter table articles_counter
    owner to root;

INSERT INTO public.articles_counter (id, total) VALUES (0, 11);