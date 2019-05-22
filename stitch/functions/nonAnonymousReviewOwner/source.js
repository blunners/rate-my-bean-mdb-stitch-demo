exports = function(currentReviewMemberId) {
  return context.user.id === currentReviewMemberId &&
    context.user.identities.some(x => x.provider_type !== 'anon-user');
};