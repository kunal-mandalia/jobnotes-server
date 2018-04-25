INSERT INTO notes (note_id, comments)
VALUES
  ('1', 'Keen on frontend optimization - reselect, flat reducers'),
  ('5', 'Node / http options');

-- INSERT INTO notes (note_id, comments)
-- VALUES ('1', 'Keen on frontend optimization - reselect, flat reducers'),
--   ('5', 'Node / http options');

INSERT INTO recruiters (recruiter_id, name, telephone)
VALUES
  ('1', 'Elliot Jones', NULL),
  ('2', 'Darren Smith', '07754930578');

INSERT INTO users
  (
    user_id,
    email,
    password,
    status,
    confirmation_code,
    role
  )
VALUES
  (
    '99',
    'k.u.n.a.l@unique.io',
    'TODO-HASH',
    'REGISTERED',
    '',
    'USER'
  );

-- insert into opportunities
