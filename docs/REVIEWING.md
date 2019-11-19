# Reviewing Pull Requests

When you're new to development, you might not be used to reading and understanding other people's code. In a production software environment, this is just as important of a skill, if not more so, than being able to write code. At first it's hard to sit down and take the time you need to actually understand someone else's code, but the more you do it, the easier it gets. The more you read other people's code, the better you'll understand how to make your own code more readable. More readable code means less friction for others, meaning more productivity for everyone!

Everyone does this differently, so feel free to just go at it on your own, but if you want some guidelines or you're having a hard time reading through a Pull Request (PR) and actually understanding what's going on, read on. I'll put down some pointers that have helped for me.

## Understand the goal

Before you even read a single line of code, read the ticket that this PR is associated with and make sure you understand what this PR is trying to achieve. This is an absolute must, every single time. Don't read any code until you have a clear idea of what the objective is - if the ticket is not clear, ask the person who wrote the PR, or the person who wrote the ticket.

## Pick a starting point

PRs that contain many different files can be overwhelming if you try to take it all in at once. Once you understand the goal of the ticket, you should be able to pick out one file that makes sense to start from. For example, if the ticket is about changing the look of the search results, you probably want to start at the component that lists the search results. If the ticket is about changing the logic of a user adding a new course to the calendar, the schedule reducer is probably a good place to start. From there, you can step through the logic one by one until you encounter references to other files (selectors, actions, functions that live elsewhere, etc), which should naturally lead you to those other files.

## Take your time

There's a huge difference between just mindlessly skimming through someone's code and actually sitting down to understand it. The latter will take much more time, and you will definitely have to read through the code multiple times. That's expected. It's not always easy to discern someone else's intent by reading their code. You should feel free to reach out to them on slack and ask questions. You reviewing their PR isn't always for you to critique their work - sometimes it's an opportunity for you to learn something from what they wrote. It goes both ways.

## A second pair of eyes

Don't hesitate to leave a comment about anything, even if you think it might be something obvious. You would be surprised how different a second pair of eyes sees the same piece of code. Offering critique is appreciated, not frowned upon - everyone's here to learn. If you suggest improvements to their code, do so in a constructive manner, but don't let it slide by just because "it's a small thing." Small things add up very quickly to tech debt that can later become unmanageable.

## Take a step back

If you feel like you've gone through all the files and left all the comments you wanted, take a step back and once again see if you understand the goal of the PR. Now that you've gone through the majority of the code, you may understand the PR in a way you didn't before, and might have more holistic comments that you might want to say.
