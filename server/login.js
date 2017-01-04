Accounts.validateLoginAttempt((attempt) => {
  const allowed = [
    'login',
    'verifyEmail'
  ];

  if (_.contains(allowed, attempt.methodName) && attempt.type == 'resume') {
    return true;
  }
  return false;
});
